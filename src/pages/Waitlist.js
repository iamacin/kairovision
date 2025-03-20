import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../utils/supabase'
import { FiCheck, FiUser, FiMail, FiPhone, FiMapPin, FiLock, FiList, FiBriefcase, FiHome, FiUsers, FiAlertCircle } from 'react-icons/fi'

const WaitlistContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  padding: 120px 5% 80px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(${({ theme }) => theme.colors.primaryRgb}, 0.03) 0%, rgba(${({ theme }) => theme.colors.primaryRgb}, 0.01) 100%);
    z-index: 0;
  }
`

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
`

const InfoSection = styled.div`
  flex: 1;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('/assets/optimized/agent2.webp') no-repeat center;
  background-size: cover;
  padding: 2rem;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 10px;
  margin-right: 2rem;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 2rem;
    min-height: 300px;
  }
`

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primaryDark});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`

const Description = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 2.5rem;
  max-width: 500px;

  @media (max-width: 968px) {
    margin: 0 auto 2rem;
  }
`

const FormSection = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background};
  padding: 2.5rem;
  border-radius: ${({ theme }) => theme.layout.borderRadiusLg};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  width: 100%;
  max-width: 600px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Label = styled.label`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
`

const Input = styled.input`
  padding: 0.8rem 1rem;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  background: transparent;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const Select = styled.select`
  padding: 0.8rem 1rem;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  background: transparent;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const Button = styled(motion.button)`
  padding: 1rem 2rem;
  background: ${({ theme, secondary }) => secondary ? 'transparent' : theme.colors.primary};
  color: ${({ theme, secondary }) => secondary ? theme.colors.primary : 'white'};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme, secondary }) => secondary ? 'rgba(138, 43, 226, 0.1)' : theme.colors.primaryDark};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`

const ErrorMessage = styled(motion.div)`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.9rem;
  margin-top: 0.5rem;
`

const SuccessMessage = styled(motion.div)`
  color: ${({ theme }) => theme.colors.success};
  font-size: 1rem;
  line-height: 1.6;
  margin-top: 1rem;
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.successLight || 'rgba(0, 200, 83, 0.1)'};
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.success};
`

const CountryGroup = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 1rem;
`

const PhoneInput = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 1rem;
`

const TabsContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  max-width: 600px;
  margin-bottom: 2rem;
`

const Tab = styled(motion.button)`
  flex: 1;
  padding: 1.5rem;
  background: ${({ active, theme }) => active ? theme.colors.primary : theme.colors.backgroundAlt};
  color: ${({ active, theme }) => active ? 'white' : theme.colors.text};
  border: 2px solid ${({ active, theme }) => active ? theme.colors.primary : theme.colors.border};
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    background: ${({ active, theme }) => active ? theme.colors.primary : theme.colors.primaryLight};
    color: ${({ active }) => active ? 'white' : theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 1.25rem;
    font-size: 1rem;
    
    svg {
      width: 20px;
      height: 20px;
    }
  }
`

const StepsContainer = styled.div`
  width: 100%;
  margin-bottom: 2.5rem;
`

const StepsList = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  margin: 0 1rem;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 3px;
    background: ${({ theme }) => theme.colors.border};
    transform: translateY(-50%);
    z-index: 0;
  }
`

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
  
  &::before {
    content: '';
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: ${({ active, completed, theme }) => 
      completed ? theme.colors.primary 
      : active ? theme.colors.primaryLight
      : theme.colors.background};
    border: 3px solid ${({ completed, theme }) => 
      completed ? theme.colors.primary : theme.colors.border};
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }

  @media (max-width: 768px) {
    &::before {
      width: 40px;
      height: 40px;
    }
  }
`

const StepLabel = styled.span`
  font-size: 1rem;
  color: ${({ active, completed, theme }) => 
    completed || active ? theme.colors.primary : theme.colors.textSecondary};
  font-weight: ${({ active }) => active ? '600' : '400'};
  text-align: center;
  max-width: 120px;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    max-width: 100px;
  }
`

const Waitlist = () => {
  const [userType, setUserType] = useState('client');
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    phoneCountry: '+221',
    country: 'Senegal',
    role: '',
    agencyName: '',
    agencyWebsite: '',
    experience: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSupabaseReady, setIsSupabaseReady] = useState(false);

  // Check Supabase connection on mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { data, error } = await supabase.from('waitlist').select('count');
        if (error) throw error;
        setIsSupabaseReady(true);
      } catch (error) {
        console.error('Database connection error:', error);
        setError('La connexion à la base de données n\'est pas disponible. Veuillez réessayer plus tard.');
      }
    };
    checkConnection();
  }, []);

  // Liste complète des pays avec leurs codes téléphoniques
  const countries = [
    { name: 'Afghanistan', code: '+93' },
    { name: 'Albania', code: '+355' },
    { name: 'Algeria', code: '+213' },
    { name: 'Angola', code: '+244' },
    { name: 'Argentina', code: '+54' },
    { name: 'Australia', code: '+61' },
    { name: 'Austria', code: '+43' },
    { name: 'Belgium', code: '+32' },
    { name: 'Benin', code: '+229' },
    { name: 'Brazil', code: '+55' },
    { name: 'Burkina Faso', code: '+226' },
    { name: 'Cameroon', code: '+237' },
    { name: 'Canada', code: '+1' },
    { name: 'Cape Verde', code: '+238' },
    { name: 'Central African Republic', code: '+236' },
    { name: 'Chad', code: '+235' },
    { name: 'China', code: '+86' },
    { name: 'Colombia', code: '+57' },
    { name: 'Congo', code: '+242' },
    { name: 'Democratic Republic of the Congo', code: '+243' },
    { name: 'Denmark', code: '+45' },
    { name: 'Djibouti', code: '+253' },
    { name: 'Egypt', code: '+20' },
    { name: 'Equatorial Guinea', code: '+240' },
    { name: 'Ethiopia', code: '+251' },
    { name: 'Finland', code: '+358' },
    { name: 'France', code: '+33' },
    { name: 'Gabon', code: '+241' },
    { name: 'Gambia', code: '+220' },
    { name: 'Germany', code: '+49' },
    { name: 'Ghana', code: '+233' },
    { name: 'Greece', code: '+30' },
    { name: 'Guinea', code: '+224' },
    { name: 'Guinea-Bissau', code: '+245' },
    { name: 'India', code: '+91' },
    { name: 'Ireland', code: '+353' },
    { name: 'Italy', code: '+39' },
    { name: 'Ivory Coast', code: '+225' },
    { name: 'Japan', code: '+81' },
    { name: 'Kenya', code: '+254' },
    { name: 'Liberia', code: '+231' },
    { name: 'Libya', code: '+218' },
    { name: 'Madagascar', code: '+261' },
    { name: 'Malawi', code: '+265' },
    { name: 'Mali', code: '+223' },
    { name: 'Mauritania', code: '+222' },
    { name: 'Mauritius', code: '+230' },
    { name: 'Mexico', code: '+52' },
    { name: 'Morocco', code: '+212' },
    { name: 'Mozambique', code: '+258' },
    { name: 'Namibia', code: '+264' },
    { name: 'Netherlands', code: '+31' },
    { name: 'Niger', code: '+227' },
    { name: 'Nigeria', code: '+234' },
    { name: 'Norway', code: '+47' },
    { name: 'Portugal', code: '+351' },
    { name: 'Russia', code: '+7' },
    { name: 'Rwanda', code: '+250' },
    { name: 'Sao Tome and Principe', code: '+239' },
    { name: 'Saudi Arabia', code: '+966' },
    { name: 'Senegal', code: '+221' },
    { name: 'Sierra Leone', code: '+232' },
    { name: 'Somalia', code: '+252' },
    { name: 'South Africa', code: '+27' },
    { name: 'South Korea', code: '+82' },
    { name: 'Spain', code: '+34' },
    { name: 'Sudan', code: '+249' },
    { name: 'Sweden', code: '+46' },
    { name: 'Switzerland', code: '+41' },
    { name: 'Tanzania', code: '+255' },
    { name: 'Togo', code: '+228' },
    { name: 'Tunisia', code: '+216' },
    { name: 'Turkey', code: '+90' },
    { name: 'Uganda', code: '+256' },
    { name: 'United Arab Emirates', code: '+971' },
    { name: 'United Kingdom', code: '+44' },
    { name: 'United States', code: '+1' },
    { name: 'Zambia', code: '+260' },
    { name: 'Zimbabwe', code: '+263' }
  ].sort((a, b) => a.name.localeCompare(b.name));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone, countryCode) => {
    // Remove spaces and any other formatting
    const cleanPhone = phone.replace(/\s+/g, '').replace(/-/g, '');
    
    // If the phone number already includes the country code, remove it for validation
    const phoneWithoutCode = cleanPhone.startsWith(countryCode) 
      ? cleanPhone.slice(countryCode.length)
      : cleanPhone;
    
    // Check if the remaining number contains only digits
    if (!/^\d+$/.test(phoneWithoutCode)) {
      return false;
    }
    
    // Most international phone numbers are between 6 and 15 digits
    // (not counting the country code)
    return phoneWithoutCode.length >= 6 && phoneWithoutCode.length <= 15;
  };

  const validateWebsite = (url) => {
    if (!url) return true; // Optional field
    try {
      new URL(url);
      return url.startsWith('http://') || url.startsWith('https://');
    } catch {
      return false;
    }
  };

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        if (!formData.email || !formData.password || !formData.confirmPassword) {
          setError('Tous les champs sont requis');
          return false;
        }
        if (!validateEmail(formData.email)) {
          setError('Veuillez entrer une adresse email valide');
          return false;
        }
        if (formData.password !== formData.confirmPassword) {
          setError('Les mots de passe ne correspondent pas');
          return false;
        }
        if (formData.password.length < 8) {
          setError('Le mot de passe doit contenir au moins 8 caractères');
          return false;
        }
        break;
      case 2:
        if (!formData.firstName || !formData.lastName || !formData.phone || !formData.country) {
          setError('Tous les champs sont requis');
          return false;
        }
        if (!validatePhone(formData.phone, formData.phoneCountry)) {
          setError('Veuillez entrer un numéro de téléphone valide');
          return false;
        }
        break;
      case 3:
        if (userType === 'agent') {
          if (!formData.agencyName) {
            setError('Le nom de l\'agence est requis');
            return false;
          }
          if (formData.agencyWebsite && !validateWebsite(formData.agencyWebsite)) {
            setError('Veuillez entrer une URL de site web valide (commençant par http:// ou https://)');
            return false;
          }
          if (!formData.experience) {
            setError('L\'expérience est requise');
            return false;
          }
        } else {
          if (!formData.role) {
            setError('Veuillez sélectionner votre objectif');
            return false;
          }
        }
        break;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(prev => prev + 1);
      setError('');
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    setIsSubmitting(true);
    setError('');

    try {
      if (!isSupabaseReady) {
        throw new Error('La connexion à la base de données n\'est pas disponible. Veuillez réessayer plus tard.');
      }

      // First, check if the user already exists
      const { data: existingUser, error: checkError } = await supabase
        .from('waitlist')
        .select('id')
        .eq('email', formData.email)
        .single();

      if (checkError && checkError.message !== 'No rows found') {
        throw new Error('Erreur lors de la vérification de l\'email. Veuillez réessayer.');
      }

      if (existingUser) {
        throw new Error('Un compte avec cet email existe déjà.');
      }

      // Create auth user
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            access_level: 'pending'
          }
        }
      });

      if (signUpError) {
        console.error('Signup error:', signUpError);
        throw new Error(
          signUpError.message === 'User already registered'
            ? 'Un compte avec cet email existe déjà.'
            : 'Erreur lors de l\'inscription. Veuillez réessayer.'
        );
      }

      if (!data?.user?.id) {
        throw new Error('Erreur lors de la création du compte.');
      }

      // Prepare waitlist data
      const waitlistData = {
        user_id: data.user.id,
        email: formData.email,
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phoneCountry + formData.phone.replace(/\s+/g, ''),
        location: formData.country,
        role: userType === 'agent' ? 'agent' : formData.role,
        status: 'pending',
        submission_date: new Date().toISOString()
      };

      if (userType === 'agent') {
        waitlistData.agency_name = formData.agencyName;
        waitlistData.agency_website = formData.agencyWebsite;
        waitlistData.experience = formData.experience;
      }

      const { error: waitlistError } = await supabase
        .from('waitlist')
        .insert([waitlistData]);

      if (waitlistError) {
        console.error('Waitlist insertion error:', waitlistError);
        throw new Error('Erreur lors de l\'enregistrement des données. Veuillez réessayer.');
      }

      setSuccess(
        userType === 'agent'
          ? `Votre demande d'inscription en tant qu'agent immobilier a été enregistrée avec succès ! Notre équipe examinera votre profil et vous contactera par email une fois votre compte approuvé.`
          : `Votre inscription a été enregistrée avec succès ! Vous recevrez un email de confirmation pour activer votre compte.`
      );

      // Reset form
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        phone: '',
        phoneCountry: '+221',
        country: 'Senegal',
        role: '',
        agencyName: '',
        agencyWebsite: '',
        experience: ''
      });
      setCurrentStep(1);
      
    } catch (error) {
      console.error('Form submission error:', error);
      setError(error.message || 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneCountryChange = (e) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      phoneCountry: value
    }));
  };

  const formatPhoneNumber = (phone, countryCode) => {
    // Remove any existing formatting
    let cleaned = phone.replace(/\D/g, '');
    
    // Remove country code if it exists at the start
    if (cleaned.startsWith(countryCode.replace('+', ''))) {
      cleaned = cleaned.slice(countryCode.replace('+', '').length);
    }
    
    // Format the number in groups of 2 or 3 digits
    let formatted = '';
    for (let i = 0; i < cleaned.length; i += 2) {
      formatted += cleaned.slice(i, i + 2) + ' ';
    }
    
    return formatted.trim();
  };

  const handlePhoneChange = (e) => {
    const { value } = e.target;
    const formattedValue = formatPhoneNumber(value, formData.phoneCountry);
    setFormData(prev => ({
      ...prev,
      phone: formattedValue
    }));
  };

  const handleTabChange = (type) => {
    setUserType(type);
    setCurrentStep(1);
    setError('');
    setSuccess('');
    setFormData(prev => ({
      ...prev,
      role: type === 'agent' ? 'agent' : '',
      agencyName: '',
      agencyWebsite: '',
      experience: type === 'agent' ? '' : undefined // Remove experience for clients
    }));
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return 'Inscription';
      case 2:
        return 'Profil';
      case 3:
        return userType === 'agent' ? 'Informations professionnelles' : 'Préférences';
      default:
        return '';
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <InputGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="votre@email.com"
              />
            </InputGroup>
            <InputGroup>
              <Label>Mot de passe</Label>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="********"
              />
            </InputGroup>
            <InputGroup>
              <Label>Confirmer le mot de passe</Label>
              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="********"
              />
            </InputGroup>
          </>
        );
      case 2:
        return (
          <>
            <InputGroup>
              <Label>Prénom</Label>
              <Input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Votre prénom"
              />
            </InputGroup>
            <InputGroup>
              <Label>Nom</Label>
              <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Votre nom"
              />
            </InputGroup>
            <InputGroup>
              <Label>Téléphone</Label>
              <PhoneInput>
                <Select
                  name="phoneCountry"
                  value={formData.phoneCountry}
                  onChange={handlePhoneCountryChange}
                >
                  {countries.map(country => (
                    <option key={country.code} value={country.code}>
                      {`${country.code} (${country.name})`}
                    </option>
                  ))}
                </Select>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  placeholder="XX XX XX XX"
                />
              </PhoneInput>
              <small style={{ color: '#666', marginTop: '0.25rem' }}>
                Format: {formData.phoneCountry} XX XX XX XX
              </small>
            </InputGroup>
            <InputGroup>
              <Label>Pays</Label>
              <Select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
              >
                <option value="">Sélectionnez votre pays</option>
                {countries.map(country => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </Select>
            </InputGroup>
          </>
        );
      case 3:
        if (userType === 'agent') {
          return (
            <>
              <InputGroup>
                <Label>Nom de l'agence *</Label>
                <Input
                  type="text"
                  name="agencyName"
                  value={formData.agencyName}
                  onChange={handleInputChange}
                  placeholder="Nom de votre agence immobilière"
                />
              </InputGroup>
              <InputGroup>
                <Label>Site web de l'agence (optionnel)</Label>
                <Input
                  type="url"
                  name="agencyWebsite"
                  value={formData.agencyWebsite}
                  onChange={handleInputChange}
                  placeholder="https://www.votreagence.com"
                />
                <small style={{ color: '#666', marginTop: '0.25rem' }}>
                  Format: https://www.example.com
                </small>
              </InputGroup>
              <InputGroup>
                <Label>Expérience dans l'immobilier *</Label>
                <Select
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                >
                  <option value="">Sélectionnez votre expérience</option>
                  <option value="0-1">0-1 an</option>
                  <option value="1-3">1-3 ans</option>
                  <option value="3-5">3-5 ans</option>
                  <option value="5+">5+ ans</option>
                </Select>
              </InputGroup>
            </>
          );
        } else {
          return (
            <>
              <InputGroup>
                <Label>Type de bien recherché</Label>
                <Select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                >
                  <option value="">Sélectionnez votre objectif</option>
                  <option value="buyer">Achat</option>
                  <option value="renter">Location</option>
                  <option value="seller">Vente</option>
                  <option value="landlord">Mise en location</option>
                </Select>
              </InputGroup>
              <InputGroup>
                <Label>Expérience avec l'immobilier</Label>
                <Select
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                >
                  <option value="">Sélectionnez votre expérience</option>
                  <option value="0-1">Première fois</option>
                  <option value="1-3">Quelques transactions</option>
                  <option value="3-5">Expérimenté</option>
                  <option value="5+">Expert</option>
                </Select>
              </InputGroup>
            </>
          );
        }
      default:
        return null;
    }
  };

  return (
    <WaitlistContainer>
      <ContentWrapper>
        <InfoSection>
          <Title>Rejoignez la révolution immobilière au Sénégal</Title>
          <Description>
            {userType === 'client' 
              ? "Inscrivez-vous pour accéder à notre plateforme et découvrir les meilleures opportunités immobilières."
              : "Vous êtes un professionnel de l'immobilier ? Rejoignez notre réseau d'agents et promoteurs certifiés."}
          </Description>
        </InfoSection>

        <TabsContainer>
          <Tab
            active={userType === 'client'}
            onClick={() => handleTabChange('client')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiUser />
            Client
          </Tab>
          <Tab
            active={userType === 'agent'}
            onClick={() => handleTabChange('agent')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiBriefcase />
            Agent / Promoteur
          </Tab>
        </TabsContainer>

        <FormSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <StepsContainer>
            <StepsList>
              <Step active={currentStep === 1} completed={currentStep > 1}>
                <StepLabel active={currentStep === 1} completed={currentStep > 1}>
                  Inscription
                </StepLabel>
              </Step>
              <Step active={currentStep === 2} completed={currentStep > 2}>
                <StepLabel active={currentStep === 2} completed={currentStep > 2}>
                  Profil
                </StepLabel>
              </Step>
              <Step active={currentStep === 3} completed={currentStep > 3}>
                <StepLabel active={currentStep === 3} completed={currentStep > 3}>
                  {userType === 'agent' ? 'Informations pro' : 'Préférences'}
                </StepLabel>
              </Step>
            </StepsList>
          </StepsContainer>

          <Form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${userType}-${currentStep}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>

            {error && (
              <ErrorMessage
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ width: '100%', maxWidth: '600px', marginBottom: '2rem' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FiAlertCircle size={20} />
                  {error}
                </div>
                {!isSupabaseReady && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
                    Si le problème persiste, veuillez contacter notre support technique.
                  </div>
                )}
              </ErrorMessage>
            )}

            {success && (
              <SuccessMessage
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {success}
              </SuccessMessage>
            )}

            <ButtonGroup>
              {currentStep > 1 && (
                <Button
                  type="button"
                  onClick={handleBack}
                  secondary
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Retour
                </Button>
              )}
              {currentStep < 3 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Suivant
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <svg
                        style={{
                          animation: 'spin 1s linear infinite',
                          width: '20px',
                          height: '20px'
                        }}
                        viewBox="0 0 50 50"
                      >
                        <circle
                          style={{
                            stroke: 'currentColor',
                            strokeWidth: 4,
                            fill: 'none'
                          }}
                          cx="25"
                          cy="25"
                          r="20"
                        />
                      </svg>
                      Envoi en cours...
                    </span>
                  ) : (
                    "Terminer l'inscription"
                  )}
                </Button>
              )}
            </ButtonGroup>
          </Form>
        </FormSection>
      </ContentWrapper>
    </WaitlistContainer>
  );
};

// Add keyframe animation for spinner
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

export default Waitlist;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/tailwind.css';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    file: null,
    files: [],
    geolocation: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [countryCode, setCountryCode] = useState('+91'); // Default country code for India

  useEffect(() => {
    fetchGeolocationStatus();
  }, [step]);

  const handleNextStep = () => {
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      setFormErrors({});
      setStep((prevStep) => prevStep + 1);
    } else {
      setFormErrors(errors);
    }
  };

  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleFormSubmit = async () => {
    try {
      const response = await axios.post(
        'https://x8ki-letl-twmt.n7.xano.io/api:XooRuQbs/form',
        formData
      );
  
      if (response.status === 200) {
        setFormSubmitted(true);
      } else {
        setFormSubmitted(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setFormSubmitted(false);
    }
  };
  
  const fetchGeolocationStatus = () => {
    if ('geolocation' in navigator && step === 4) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const geolocation = `Latitude: ${latitude}, Longitude: ${longitude}`;
          setFormData((prevData) => ({ ...prevData, geolocation }));
        },
        (error) => {
          console.error('Error getting geolocation:', error);
        }
      );
    }
  };

  const validateForm = () => {
    const errors = {};

    // Perform validation for each field
    if (step === 1) {
      if (!formData.name) {
        errors.name = 'Name is required';
      }
      if (!formData.email) {
        errors.email = 'Email is required';
      }
      if (!formData.phone) {
        errors.phone = 'Phone is required';
      }
    } else if (step === 2) {
      if (!formData.addressLine1) {
        errors.addressLine1 = 'Address Line 1 is required';
      }
      if (!formData.city) {
        errors.city = 'City is required';
      }
      if (!formData.state) {
        errors.state = 'State is required';
      }
      if (!formData.pincode) {
        errors.pincode = 'Pincode is required';
      }
      if (!formData.country) {
        errors.country = 'Country is required';
      }
    }

    return errors;
  };


  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-6">Step 1: Basic Details</h2>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} rounded px-4 py-2 mb-4`}
            />
            {formErrors.name && <p className="text-red-500 text-xs mb-2">{formErrors.name}</p>}
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded px-4 py-2 mb-4`}
            />
            {formErrors.email && <p className="text-red-500 text-xs mb-2">{formErrors.email}</p>}
            <div className="relative">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="appearance-none border border-gray-300 rounded px-4 py-2 mb-4 pr-8">
                  <option value="+91">🇮🇳 +91</option> {/* Indian Flag */}
                  <option value="+1">🇺🇸 +1</option> {/* US Flag */}
                  <option value="+213">🇩🇿 +213</option> {/* Algeria */}
                  <option value="+54">🇦🇷 +54</option> {/* Argentina */}
                  <option value="+61">🇦🇺 +61</option> {/* Australia */}
                  <option value="+43">🇦🇹 +43</option> {/* Austria */}
                  <option value="+32">🇧🇪 +32</option> {/* Belgium */}
                  <option value="+55">🇧🇷 +55</option> {/* Brazil */}
                  <option value="+359">🇧🇬 +359</option> {/* Bulgaria */}
                  <option value="+1">🇨🇦 +1</option> {/* Canada */}
                  <option value="+56">🇨🇱 +56</option> {/* Chile */}
                  <option value="+86">🇨🇳 +86</option> {/* China */}
                  <option value="+57">🇨🇴 +57</option> {/* Colombia */}
                  <option value="+385">🇭🇷 +385</option> {/* Croatia */}
                  <option value="+357">🇨🇾 +357</option> {/* Cyprus */}
                  <option value="+420">🇨🇿 +420</option> {/* Czech Republic */}
                  <option value="+45">🇩🇰 +45</option> {/* Denmark */}
                  <option value="+20">🇪🇬 +20</option> {/* Egypt */}
                  <option value="+358">🇫🇮 +358</option> {/* Finland */}
                  <option value="+33">🇫🇷 +33</option> {/* France */}
                  <option value="+49">🇩🇪 +49</option> {/* Germany */}
                  <option value="+30">🇬🇷 +30</option> {/* Greece */}
                  <option value="+852">🇭🇰 +852</option> {/* Hong Kong */}
                  <option value="+36">🇭🇺 +36</option> {/* Hungary */}
                  <option value="+91">🇮🇳 +91</option> {/* India */}
                  <option value="+62">🇮🇩 +62</option> {/* Indonesia */}
                  <option value="+353">🇮🇪 +353</option> {/* Ireland */}
                  <option value="+39">🇮🇹 +39</option> {/* Italy */}
                  <option value="+81">🇯🇵 +81</option> {/* Japan */}
                  <option value="+965">🇰🇼 +965</option> {/* Kuwait */}
                  <option value="+961">🇱🇧 +961</option> {/* Lebanon */}
                  <option value="+352">🇱🇺 +352</option> {/* Luxembourg */}
                  <option value="+60">🇲🇾 +60</option> {/* Malaysia */}
                  <option value="+356">🇲🇹 +356</option> {/* Malta */}
                  <option value="+52">🇲🇽 +52</option> {/* Mexico */}
                  <option value="+31">🇳🇱 +31</option> {/* Netherlands */}
                  <option value="+64">🇳🇿 +64</option> {/* New Zealand */}
                  <option value="+47">🇳🇴 +47</option> {/* Norway */}
                  <option value="+92">🇵🇰 +92</option> {/* Pakistan */}
                  <option value="+51">🇵🇪 +51</option> {/* Peru */}
                  <option value="+63">🇵🇭 +63</option> {/* Philippines */}
                  <option value="+48">🇵🇱 +48</option> {/* Poland */}
                  <option value="+351">🇵🇹 +351</option> {/* Portugal */}
                  <option value="+974">🇶🇦 +974</option> {/* Qatar */}
                  <option value="+40">🇷🇴 +40</option> {/* Romania */}
                  <option value="+7">🇷🇺 +7</option> {/* Russia */}
                  <option value="+966">🇸🇦 +966</option> {/* Saudi Arabia */}
                  <option value="+65">🇸🇬 +65</option> {/* Singapore */}
                  <option value="+27">🇿🇦 +27</option> {/* South Africa */}
                  <option value="+82">🇰🇷 +82</option> {/* South Korea */}
                  <option value="+34">🇪🇸 +34</option> {/* Spain */}
                  <option value="+46">🇸🇪 +46</option> {/* Sweden */}
                  <option value="+41">🇨🇭 +41</option> {/* Switzerland */}
                  <option value="+886">🇹🇼 +886</option> {/* Taiwan */}
                  <option value="+66">🇹🇭 +66</option> {/* Thailand */}
                  <option value="+90">🇹🇷 +90</option> {/* Turkey */}
                  <option value="+971">🇦🇪 +971</option> {/* United Arab Emirates */}
                  <option value="+44">🇬🇧 +44</option> {/* United Kingdom */}
                  <option value="+598">🇺🇾 +598</option> {/* Uruguay */}
                  <option value="+84">🇻🇳 +84</option> {/* Vietnam */}
                  {/* Add more country options here */}
                </select>
              <div
                className="absolute right-0 top-0 bottom-0 flex items-center pointer-events-none pr-3"
                  style={{ color: '#718096' }}>
            </div>
          </div>
            <input
              type="tel"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`border ${formErrors.phone ? 'border-red-500' : 'border-gray-300'} rounded px-4 py-2 mb-4`}
            />
            {formErrors.phone && <p className="text-red-500 text-xs mb-2">{formErrors.phone}</p>}
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-6">Step 2: Address</h2>
            <input
              type="text"
              placeholder="Address Line 1"
              value={formData.addressLine1}
              onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
              className={`border ${formErrors.addressLine1 ? 'border-red-500' : 'border-gray-300'} rounded px-4 py-2 mb-4`}
            />
            {formErrors.addressLine1 && <p className="text-red-500 text-xs mb-2">{formErrors.addressLine1}</p>}
            <input
              type="text"
              placeholder="Address Line 2"
              value={formData.addressLine2}
              onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
              className="border border-gray-300 rounded px-4 py-2 mb-4"
            />
            <input
              type="text"
              placeholder="City"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className={`border ${formErrors.city ? 'border-red-500' : 'border-gray-300'} rounded px-4 py-2 mb-4`}
            />
            {formErrors.city && <p className="text-red-500 text-xs mb-2">{formErrors.city}</p>}
            <input
              type="text"
              placeholder="State"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              className={`border ${formErrors.state ? 'border-red-500' : 'border-gray-300'} rounded px-4 py-2 mb-4`}
            />
            {formErrors.state && <p className="text-red-500 text-xs mb-2">{formErrors.state}</p>}
            <input
              type="text"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
              className={`border ${formErrors.pincode ? 'border-red-500' : 'border-gray-300'} rounded px-4 py-2 mb-4`}
            />
            {formErrors.pincode && <p className="text-red-500 text-xs mb-2">{formErrors.pincode}</p>}
            <input
              type="text"
              placeholder="Country"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className={`border ${formErrors.country ? 'border-red-500' : 'border-gray-300'} rounded px-4 py-2 mb-4`}
            />
            {formErrors.country && <p className="text-red-500 text-xs mb-2">{formErrors.country}</p>}
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-6">Step 3: File Upload</h2>
            <input
              type="file"
              accept=".png, .pdf"
              onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
              className="mb-4"
            />
          </div>
        );
      case 4:
        return (
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-6">Step 4: Multi File Upload</h2>
            <input
              type="file"
              accept=".png, .pdf"
              multiple
              onChange={(e) => setFormData({ ...formData, files: e.target.files })}
              className="mb-4"
            />
            <p>Geolocation Status: {formData.geolocation}</p>
          </div>
        );
      case 5:
        return (
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-6">Step 5: Status</h2>
            {formSubmitted ? (
              <p>Form submitted successfully!</p>
            ) : (
              <p>Form submission failed. Please try again.</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-6">Multi-Step Form</h1>
      <div className="border border-gray-300 rounded px-4 py-6">
        {renderStepContent()}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
            style={{
              backgroundColor: '#4299e1',
              color: 'white',
              borderRadius: '4px',
              padding: '4px 8px',
              marginBottom: '23px',
              marginRight: '65px'
            }}
            onClick={handlePreviousStep}
            >
              Previous
            </button>
          )}
          {step < 5 ? (
            <button
              className="bg-blue-500 text-white rounded px-4 py-2 mb-6 ml-2"
              onClick={handleNextStep}
            >
                        Next
            </button>
          ) : (
            <button
              className="bg-blue-500 text-white rounded px-4 py-2"
              onClick={handleFormSubmit}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;

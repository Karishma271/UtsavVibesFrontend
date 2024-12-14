import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './VenueForm.css';

const VenueForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    occasionType: '',
    venueName: '',
    description: '',
    address: '',
    capacity: '',
    acceptedPayments: [],
  });

  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(''); // Store the uploaded image URL
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  const occasionTypeOptions = ['Wedding', 'Birthday', 'Conference', 'Party'];
  const paymentOptions = ['Credit Card', 'Cash', 'PayPal', 'Bank Transfer'];

  // Fetch the venue data if it's in update mode
  useEffect(() => {
    if (id) {
      axios
        .get(`/api/venues/${id}`)
        .then((response) => {
          setFormData(response.data);
          setImageUrl(response.data.imageUrl || ''); // Set the existing image URL
          setIsUpdateMode(true);
        })
        .catch((error) => console.error('Error fetching venue:', error));
    }
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle payment method selection
  const handlePaymentChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({
      ...formData,
      acceptedPayments: selectedOptions,
    });
  };

  // Handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    // Display a preview of the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result); // Set image URL for preview
    };
    if (file) reader.readAsDataURL(file);
  };

  // Validate the form fields
  const validateForm = () => {
    const { venueName, occasionType, address } = formData;
    if (!venueName.trim() || !occasionType || !address.trim()) {
      alert('Please fill in all required fields before submitting.');
      return false;
    }
    return true;
  };

  // Handle form submission (add/update venue)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      let imageUrlToSend = imageUrl;

      if (imageFile) {
        const imageData = new FormData();
        imageData.append('image', imageFile);

        const imageResponse = await axios.post('/api/upload-image', imageData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        imageUrlToSend = imageResponse.data.imageUrl; // Get the image URL from the backend
      }

      const updatedData = { ...formData, imageUrl: imageUrlToSend };

      if (isUpdateMode) {
        await axios.put(`/api/venues/${id}`, updatedData); // Update venue if in update mode
      } else {
        await axios.post('/api/venues', updatedData); // Add new venue if in add mode
      }

      navigate('/venues'); // Navigate back to the venue list page
    } catch (error) {
      console.error('Error saving/updating venue:', error);
    }
  };

  return (
    <div className="organizer-form-container">
      <h2>{isUpdateMode ? 'Update Venue' : 'Add Venue'}</h2>
      <form className="organizer-form" onSubmit={handleSubmit}>
        <label>Occasion Type:</label>
        <select name="occasionType" value={formData.occasionType} onChange={handleChange} required>
          <option value="">Select an occasion</option>
          {occasionTypeOptions.map((occasion) => (
            <option key={occasion} value={occasion}>
              {occasion}
            </option>
          ))}
        </select>

        <label>Venue Name:</label>
        <input
          type="text"
          name="venueName"
          value={formData.venueName}
          onChange={handleChange}
          required
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <label>Capacity:</label>
        <input
          type="number"
          name="capacity"
          value={formData.capacity}
          onChange={handleChange}
        />

        <label>Accepted Payments:</label>
        <select
          multiple
          name="acceptedPayments"
          value={formData.acceptedPayments}
          onChange={handlePaymentChange}
        >
          {paymentOptions.map((payment) => (
            <option key={payment} value={payment}>
              {payment}
            </option>
          ))}
        </select>

        <label>Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />

        {imageUrl && (
          <div className="image-preview">
            <img src={imageUrl} alt="Preview" className="preview-img" />
          </div>
        )}

        <button className="save-btn" type="submit">
          {isUpdateMode ? 'Update Venue' : 'Add Venue'}
        </button>
      </form>
    </div>
  );
};

export default VenueForm;

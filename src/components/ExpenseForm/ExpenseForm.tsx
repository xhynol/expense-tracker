// src/components/ExpenseForm/ExpenseForm.tsx
import React, { useState } from 'react';
import './ExpenseForm.css';

import type { ExpenseCategory, FilterOption, SortOption } from '../ExpenseCard/ExpenseCard';


// Form data interface
interface ExpenseFormData {
  description: string;
  amount: string;
  category: ExpenseCategory;
  date: string;
}

interface FormErrors {
  description?: string;
  amount?: string;
  category?: string;
  date?: string;
}

/**
 * Form component for creating new expense entries with validation
 * @param {Object} props - Component props
 * @param {function} props.onSubmit - Callback function when form is submitted, receives expense data
 */
interface ExpenseFormProps {
  onSubmit: (expenseData: {
    description: string;
    amount: number;
    category: ExpenseCategory;
    date: string;
  }) => void;
}

const validatingExpense = (formData: ExpenseFormData): FormErrors | null => {
  const errors: FormErrors ={}

  if (!formData.description.trim() || !formData.amount || !formData.date) {
      errors.description = ('Please fill in all required fields');

    }

    const amount = parseFloat(formData.amount);
    if (amount <= 0) {
      errors.amount = ('Amount must be greater than 0');
    }
  return errors;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onSubmit }) => {
  // Form state using controlled components pattern
  const [formData, setFormData] = useState<ExpenseFormData>({
    description: '',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0] // Today's date as default
  });
  const [errors, setErrors] = useState<FormErrors>({}) 

  /**
   * Handles input changes for all form fields using computed property names
   * @param {React.ChangeEvent<HTMLInputElement | HTMLSelectElement>} e - Change event from form inputs
   */
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Handles form submission with validation and data processing
   * @param {React.FormEvent<HTMLFormElement>} e - Form submission event
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    // Basic validation
    // if (!formData.description.trim() || !formData.amount || !formData.date) {
    //   alert('Please fill in all required fields');
    //   return;
    // }

     const amount = parseFloat(formData.amount);
    // if (amount <= 0) {
    //   alert('Amount must be greater than 0');
    //   return;
    // }
    const errors = validatingExpense(formData)
    if(errors != null){
      setErrors(errors)
      return;
    }
      

    // Submit processed data
    onSubmit({
      description: formData.description.trim(),
      amount: amount,
      category: formData.category,
      date: formData.date
    });

    // Reset form after successful submission
    setFormData({
      description: '',
      amount: '',
      category: 'Food',
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <h3>Add New Expense</h3>
      
      <div className="form-group">
        <label htmlFor="description">Description *</label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="What did you spend money on?"
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="amount">Amount *</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Shopping">Shopping</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          required
        />
      </div>

      <button type="submit" className="submit-button">
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
import React from 'react';
import './ExpenseCard.css';
import { on } from 'events';

// TypeScript interface defines the structure of props this component expects
// This acts like a contract - any parent component must provide these exact properties

// Add these union types to your project:
export type ExpenseCategory = 'Food' | 'Transportation' | 'Entertainment' | 'Other';
export type SortOption = 'date' | 'amount' | 'category';
export type FilterOption = 'All' | ExpenseCategory;

export interface ExpenseCardProps {
  id: number;              // Unique identifier for each expense
  description: string;     // What the expense was for (e.g., "Lunch at Joe's Pizza")
  amount: number;         // Cost in dollars (will be formatted to show currency)
  category: ExpenseCategory;       // Type of expense (e.g., "Food", "Transportation")
  date: string;          // When the expense occurred (formatted as string)
  onDelete ?: (id:number) => void;
  highlight?: boolean;
  showCategory?: boolean;
}

/**
 * Displays a single expense item with formatted currency and professional styling
 * @param {Object} props - Component props
 * @param {number} props.id - Unique identifier for the expense entry
 * @param {string} props.description - Human-readable description of the expense
 * @param {number} props.amount - Expense amount in dollars (will be formatted as currency)
 * @param {string} props.category - Expense category for organization and filtering
 * @param {string} props.date - Date when expense occurred (ISO string format)
 */
const ExpenseCard: React.FC<ExpenseCardProps> = ({ 
  id, 
  description, 
  amount, 
  category, 
  date, 
  onDelete,
  highlight = false,
  showCategory = true
}) => {
  // Format currency for professional display
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);

  // Format date for user-friendly display
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  const handleDelete = (e: React.MouseEvent)=> {
    e.stopPropagation();
    if(onDelete) {
      onDelete(id)
    }
  }

  return (
    <article className="expense-card" style={{background: highlight ? "rgba(129, 203, 54, 1)" : "white"}}>
      <div className="expense-header">
        {showCategory && <span className="expense-category">{category}</span>}
        <time className="expense-date" dateTime={date}>
          {formattedDate}
        </time>
      </div>
      
      <div className="expense-body">
        <h3 className="expense-description">{description}</h3>
        <p className="expense-amount">{formattedAmount}</p>

        {/*Delete button only appears if onDelete function is provided */}
        {onDelete && (
            <button 
            className='expense-delete' 
            onClick={handleDelete} 
            aria-label='Delete expense'
            style={{position: 'absolute', top:'8px',background: '#444',}}
            >
            Delete</button>)}
      </div>
    </article>
  );
};

export default ExpenseCard;
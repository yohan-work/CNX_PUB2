import { Filter } from './filter';
import './filter.css';

export default {
  title: 'Components/Filter',
  render: (args) => {
    const filter = new Filter(args);
    return filter.element;
  }
};

export const Default = {
  args: {
    filters: [
      {
        id: 'category',
        title: 'Category',
        options: [
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' },
          { value: 'option4', label: 'Option 4' },
          { value: 'option5', label: 'Option 5' },
          { value: 'option6', label: 'Option 6' }
        ]
      },
      {
        id: 'type',
        title: 'Type',
        options: [
          { value: 'type1', label: 'Type 1' },
          { value: 'type2', label: 'Type 2' },
          { value: 'type3', label: 'Type 3' }
        ]
      },
      {
        id: 'status',
        title: 'Status',
        options: [
          { value: 'active', label: 'Active' },
          { value: 'pending', label: 'Pending' },
          { value: 'completed', label: 'Completed' },
          { value: 'cancelled', label: 'Cancelled' }
        ]
      }
    ],
    onFilter: (filters) => {
      console.log('Selected filters:', filters);
    },
    onReset: () => {
      console.log('Filters reset');
    }
  }
}; 
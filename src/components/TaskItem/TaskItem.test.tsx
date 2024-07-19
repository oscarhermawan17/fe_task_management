import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import TaskItem from './TaskItem';
import type { TaskItemProps } from './TaskItem.type';

const mockTask = {
  id: 1,
  title: 'Sample Task',
  description: 'This is a sample task description.',
  status: 'In Progress'
};

const mockOnDelete = vi.fn();
const mockOpenModalUpdate = vi.fn();

const defaultProps: TaskItemProps = {
  ...mockTask,
  onDelete: mockOnDelete,
  openModalUpdate: mockOpenModalUpdate,
};

describe('TaskItem', () => {
  it('It should render component', () => {
    render(<TaskItem {...defaultProps} />);

    expect(screen.getByText(mockTask.title)).toBeInTheDocument();
    expect(screen.getByText(mockTask.description)).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('It should calls openModalForm when Edit button is clicked', () => {
    render(<TaskItem {...defaultProps} />);

    fireEvent.click(screen.getByText('Edit'));

    expect(mockOpenModalUpdate).toHaveBeenCalledWith(mockTask);
  });

  it('It should calls onDelete when Edit button is clicked', () => {
    render(<TaskItem {...defaultProps} />);

    fireEvent.click(screen.getByText('Delete'));

    expect(mockOnDelete).toHaveBeenCalledWith(mockTask.id);
  });
});

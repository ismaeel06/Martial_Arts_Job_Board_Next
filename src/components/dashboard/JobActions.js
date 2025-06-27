'use client';
import Button from '../ui/Button';

export default function JobActions({ job }) {
  return (
    <div className="flex gap-2">
      <Button size="sm" variant="primary">Approve</Button>
      <Button size="sm" variant="contact">Edit</Button>
      <Button size="sm" variant="danger">Delete</Button>
    </div>
  );
}

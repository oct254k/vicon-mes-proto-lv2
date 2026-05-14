interface FieldHeaderProps {
  title: string;
  moduleRef?: string;
}

export function FieldHeader({ title }: FieldHeaderProps) {
  return (
    <div className="mb-8 flex justify-between items-end border-b border-outline pb-4">
      <h3 className="font-label uppercase tracking-widest text-sm font-bold text-primary-container">
        {title}
      </h3>
    </div>
  );
}

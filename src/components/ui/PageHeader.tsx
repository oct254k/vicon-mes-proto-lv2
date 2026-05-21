interface PageHeaderProps {
  title: string;
  accent?: string;
  nodeRef?: string;
  status?: string;
  description?: string;
}

export function PageHeader({ title, accent, description }: PageHeaderProps) {
  return (
    <header className="mb-10 relative">
      <div className="absolute -left-8 top-0 w-1 h-12 bg-primary-accent" />
      <h1 className="text-2xl md:text-3xl font-black tracking-tighter uppercase font-headline mb-2 leading-none">
        {title}{accent && <span className="ml-2 text-on-surface">{accent}</span>}
      </h1>
      {description && (
        <p className="text-lg text-on-surface-variant/80 font-body leading-relaxed max-w-3xl">
          {description}
        </p>
      )}
    </header>
  );
}

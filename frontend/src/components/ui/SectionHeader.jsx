export const SectionHeader = ({
  title,
  subtitle,
  align = 'center',
  className = '',
}) => {
  return (
    <div className={`${align === 'center' ? 'text-center' : 'text-left'} ${className}`}>
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-emas-deep-blue">
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg text-emas-gray mt-4 ${align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;

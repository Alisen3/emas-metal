import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  features?: string[];
  className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon: Icon,
  features,
  className = '',
}) => {
  return (
    <div
      className={`
        bg-white rounded-xl p-6 md:p-8
        border border-gray-100
        transition-all duration-300 ease-out
        hover:shadow-lg hover:border-emas-soft-blue/20 hover:-translate-y-1
        group
        ${className}
      `}
    >
      <div className="w-14 h-14 rounded-xl bg-emas-light-bg flex items-center justify-center mb-5 group-hover:bg-emas-soft-blue/10 transition-colors">
        <Icon className="w-7 h-7 text-emas-soft-blue" />
      </div>
      
      <h3 className="text-xl font-heading font-semibold text-emas-deep-blue mb-3">
        {title}
      </h3>
      
      <p className="text-gray-600 leading-relaxed mb-4">
        {description}
      </p>
      
      {features && features.length > 0 && (
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emas-soft-blue mt-2 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ServiceCard;

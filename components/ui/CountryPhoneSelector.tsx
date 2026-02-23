'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { getCountryCallingCode } from 'react-phone-number-input';
import type { Country } from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
import { ChevronDown, Check, Search, Phone } from 'lucide-react';

const COUNTRIES: { code: Country; name: string }[] = [
  { code: 'TH', name: 'Thailand' },
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'AU', name: 'Australia' },
  { code: 'CN', name: 'China' },
  { code: 'JP', name: 'Japan' },
  { code: 'KR', name: 'South Korea' },
  { code: 'SG', name: 'Singapore' },
  { code: 'MY', name: 'Malaysia' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'VN', name: 'Vietnam' },
  { code: 'PH', name: 'Philippines' },
  { code: 'IN', name: 'India' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' },
  { code: 'RU', name: 'Russia' },
  { code: 'BR', name: 'Brazil' },
  { code: 'CA', name: 'Canada' },
  { code: 'MX', name: 'Mexico' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'NZ', name: 'New Zealand' },
  { code: 'HK', name: 'Hong Kong' },
  { code: 'TW', name: 'Taiwan' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'BE', name: 'Belgium' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'AT', name: 'Austria' },
  { code: 'SE', name: 'Sweden' },
  { code: 'NO', name: 'Norway' },
  { code: 'DK', name: 'Denmark' },
  { code: 'FI', name: 'Finland' },
  { code: 'PL', name: 'Poland' },
  { code: 'CZ', name: 'Czech Republic' },
  { code: 'PT', name: 'Portugal' },
  { code: 'GR', name: 'Greece' },
  { code: 'TR', name: 'Turkey' },
  { code: 'IL', name: 'Israel' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'EG', name: 'Egypt' },
  { code: 'NG', name: 'Nigeria' },
  { code: 'KE', name: 'Kenya' },
  { code: 'AR', name: 'Argentina' },
  { code: 'CL', name: 'Chile' },
  { code: 'CO', name: 'Colombia' },
  { code: 'PE', name: 'Peru' },
  { code: 'IE', name: 'Ireland' },
  { code: 'PK', name: 'Pakistan' },
  { code: 'BD', name: 'Bangladesh' },
  { code: 'LK', name: 'Sri Lanka' },
  { code: 'NP', name: 'Nepal' },
  { code: 'MM', name: 'Myanmar' },
  { code: 'KH', name: 'Cambodia' },
  { code: 'LA', name: 'Laos' },
  { code: 'BN', name: 'Brunei' },
  { code: 'MV', name: 'Maldives' },
  { code: 'QA', name: 'Qatar' },
  { code: 'KW', name: 'Kuwait' },
  { code: 'BH', name: 'Bahrain' },
  { code: 'OM', name: 'Oman' },
  { code: 'JO', name: 'Jordan' },
  { code: 'LB', name: 'Lebanon' },
  { code: 'UA', name: 'Ukraine' },
  { code: 'RO', name: 'Romania' },
  { code: 'HU', name: 'Hungary' },
  { code: 'SK', name: 'Slovakia' },
  { code: 'HR', name: 'Croatia' },
  { code: 'RS', name: 'Serbia' },
  { code: 'BG', name: 'Bulgaria' },
];

interface CountryPhoneSelectorProps {
  value: string;
  onChange: (value: string) => void;
  onCountryChange?: (countryCode: string) => void;
  defaultCountry?: Country;
  placeholder?: string;
  variant?: 'light' | 'dark';
  className?: string;
}

export function CountryPhoneSelector({
  value,
  onChange,
  onCountryChange,
  defaultCountry = 'TH',
  placeholder = 'Phone number',
  variant = 'light',
  className = '',
}: CountryPhoneSelectorProps) {
  const [country, setCountry] = useState<Country>(defaultCountry);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 10);
    }
  }, [isOpen]);

  const handleCountryChange = useCallback((newCountry: Country) => {
    setCountry(newCountry);
    setIsOpen(false);
    setSearch('');
    const dialCode = `+${getCountryCallingCode(newCountry)}`;
    onCountryChange?.(dialCode);
  }, [onCountryChange]);

  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhone = e.target.value.replace(/\D/g, '');
    onChange(newPhone);
  }, [onChange]);

  const filteredCountries = useMemo(() => {
    if (!search) return COUNTRIES;
    const searchLower = search.toLowerCase();
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(searchLower) ||
        c.code.toLowerCase().includes(searchLower) ||
        getCountryCallingCode(c.code).includes(search)
    );
  }, [search]);

  const FlagComponent = flags[country];
  const dialCode = getCountryCallingCode(country);

  const isDark = variant === 'dark';

  return (
    <div className={`flex gap-2 ${className}`}>
      {/* Country Selector - with its own stacking context */}
      <div ref={containerRef} className="relative" style={{ zIndex: isOpen ? 9999 : 1 }}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 h-12 px-3 rounded-xl border transition-all ${
            isDark
              ? 'bg-white/10 border-white/20 hover:bg-white/15 focus:border-emerald-400/60'
              : 'bg-white border-slate-200 hover:border-slate-300 focus:border-emerald-500'
          }`}
        >
          {FlagComponent && (
            <span className="w-6 h-4 flex-shrink-0 overflow-hidden rounded-sm shadow-sm">
              <FlagComponent title={country} />
            </span>
          )}
          <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-700'}`}>
            +{dialCode}
          </span>
          <ChevronDown className={`w-4 h-4 ${isDark ? 'text-white/60' : 'text-slate-400'} ${isOpen ? 'rotate-180' : ''} transition-transform`} />
        </button>

        {/* Dropdown - absolutely positioned */}
        {isOpen && (
          <div 
            className="absolute top-full left-0 mt-2 w-80 rounded-xl border shadow-2xl bg-white border-slate-200"
            style={{ zIndex: 9999 }}
          >
            {/* Search */}
            <div className="p-3 border-b border-slate-100 bg-slate-50 rounded-t-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search country..."
                  className="w-full h-10 pl-9 pr-3 rounded-lg text-sm bg-white text-slate-800 placeholder:text-slate-400 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Countries List */}
            <div className="max-h-64 overflow-y-auto rounded-b-xl">
              {filteredCountries.length === 0 ? (
                <div className="p-4 text-center text-sm text-slate-500">
                  No country found
                </div>
              ) : (
                filteredCountries.map((c) => {
                  const Flag = flags[c.code];
                  const isSelected = country === c.code;
                  return (
                    <button
                      key={c.code}
                      type="button"
                      onClick={() => handleCountryChange(c.code)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                        isSelected
                          ? 'bg-emerald-50'
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      {Flag && (
                        <span className="w-6 h-4 flex-shrink-0 overflow-hidden rounded-sm shadow-sm">
                          <Flag title={c.name} />
                        </span>
                      )}
                      <span className="flex-1 text-sm font-medium text-slate-700">
                        {c.name}
                      </span>
                      <span className="text-sm text-slate-500">
                        +{getCountryCallingCode(c.code)}
                      </span>
                      {isSelected && (
                        <Check className="w-4 h-4 text-emerald-500" />
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {/* Phone Input */}
      <div className="relative flex-1">
        <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-white/40' : 'text-slate-400'}`} />
        <input
          type="tel"
          value={value}
          onChange={handlePhoneChange}
          placeholder={placeholder}
          className={`w-full h-12 pl-11 pr-4 rounded-xl text-sm transition-all ${
            isDark
              ? 'bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-emerald-400/60 focus:bg-white/15'
              : 'bg-white border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
          }`}
        />
      </div>
    </div>
  );
}

export default CountryPhoneSelector;

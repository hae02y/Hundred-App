'use client';

import { useState } from 'react';
import { AppConfig } from '@/types/app-config';

interface UnitConverterAppProps {
  config: AppConfig;
}

type UnitType = 'length' | 'weight' | 'temperature';

export default function UnitConverterApp({ config }: UnitConverterAppProps) {
  const [unitType, setUnitType] = useState<UnitType>('length');
  const [fromValue, setFromValue] = useState('');
  const [fromUnit, setFromUnit] = useState('cm');
  const [toUnit, setToUnit] = useState('m');

  const lengthUnits = [
    { key: 'mm', label: '밀리미터 (mm)', factor: 0.001 },
    { key: 'cm', label: '센티미터 (cm)', factor: 0.01 },
    { key: 'm', label: '미터 (m)', factor: 1 },
    { key: 'km', label: '킬로미터 (km)', factor: 1000 },
    { key: 'in', label: '인치 (in)', factor: 0.0254 },
    { key: 'ft', label: '피트 (ft)', factor: 0.3048 },
    { key: 'yd', label: '야드 (yd)', factor: 0.9144 },
    { key: 'mi', label: '마일 (mi)', factor: 1609.34 },
  ];

  const weightUnits = [
    { key: 'g', label: '그램 (g)', factor: 0.001 },
    { key: 'kg', label: '킬로그램 (kg)', factor: 1 },
    { key: 't', label: '톤 (t)', factor: 1000 },
    { key: 'oz', label: '온스 (oz)', factor: 0.0283495 },
    { key: 'lb', label: '파운드 (lb)', factor: 0.453592 },
  ];

  const temperatureUnits = [
    { key: 'c', label: '섭씨 (°C)', factor: 1 },
    { key: 'f', label: '화씨 (°F)', factor: 1 },
    { key: 'k', label: '켈빈 (K)', factor: 1 },
  ];

  const getUnits = () => {
    if (unitType === 'length') return lengthUnits;
    if (unitType === 'weight') return weightUnits;
    return temperatureUnits;
  };

  const convert = () => {
    const value = parseFloat(fromValue);
    if (isNaN(value)) return '';

    if (unitType === 'temperature') {
      if (fromUnit === 'c' && toUnit === 'f') {
        return ((value * 9) / 5 + 32).toFixed(2);
      }
      if (fromUnit === 'f' && toUnit === 'c') {
        return (((value - 32) * 5) / 9).toFixed(2);
      }
      if (fromUnit === 'c' && toUnit === 'k') {
        return (value + 273.15).toFixed(2);
      }
      if (fromUnit === 'k' && toUnit === 'c') {
        return (value - 273.15).toFixed(2);
      }
      if (fromUnit === 'f' && toUnit === 'k') {
        return (((value - 32) * 5) / 9 + 273.15).toFixed(2);
      }
      if (fromUnit === 'k' && toUnit === 'f') {
        return (((value - 273.15) * 9) / 5 + 32).toFixed(2);
      }
      return value.toFixed(2);
    }

    const units = getUnits();
    const fromFactor = units.find((u) => u.key === fromUnit)?.factor || 1;
    const toFactor = units.find((u) => u.key === toUnit)?.factor || 1;

    const baseValue = value * fromFactor;
    const result = baseValue / toFactor;

    return result.toFixed(4);
  };

  const theme = config.theme;
  const result = convert();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8"
      style={{
        background: `linear-gradient(135deg, ${theme.background} 0%, ${theme.background}dd 100%)`,
      }}
    >
      <div className="w-full max-w-2xl">
        <header className="text-center mb-8">
          <h1
            className="text-4xl md:text-5xl font-bold mb-2"
            style={{ color: theme.primary }}
          >
            {config.title}
          </h1>
          {config.description && (
            <p className="text-gray-600 dark:text-gray-300">
              {config.description}
            </p>
          )}
        </header>

        <div
          className="rounded-3xl shadow-2xl p-6 md:p-8"
          style={{ backgroundColor: theme.background }}
        >
          <div className="space-y-6">
            {/* 단위 타입 선택 */}
            <div>
              <label className="block text-lg font-semibold mb-3" style={{ color: theme.primary }}>
                단위 종류
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['length', 'weight', 'temperature'] as UnitType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setUnitType(type);
                      setFromValue('');
                      if (type === 'length') {
                        setFromUnit('cm');
                        setToUnit('m');
                      } else if (type === 'weight') {
                        setFromUnit('g');
                        setToUnit('kg');
                      } else {
                        setFromUnit('c');
                        setToUnit('f');
                      }
                    }}
                    className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                      unitType === type
                        ? 'text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                    style={{
                      backgroundColor: unitType === type ? theme.primary : undefined,
                    }}
                  >
                    {type === 'length' ? '길이' : type === 'weight' ? '무게' : '온도'}
                  </button>
                ))}
              </div>
            </div>

            {/* 변환 입력 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-lg font-semibold mb-3" style={{ color: theme.primary }}>
                  변환할 값
                </label>
                <input
                  type="number"
                  value={fromValue}
                  onChange={(e) => setFromValue(e.target.value)}
                  placeholder="값 입력"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-500 transition-all duration-200"
                  onInput={() => {
                    // 실시간 계산을 위해 빈 함수 (convert 함수가 자동으로 호출됨)
                  }}
                />
                <select
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="w-full mt-2 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-500"
                >
                  {getUnits().map((unit) => (
                    <option key={unit.key} value={unit.key}>
                      {unit.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-lg font-semibold mb-3" style={{ color: theme.primary }}>
                  변환 결과
                </label>
                <div className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                  {result || '-'}
                </div>
                <select
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="w-full mt-2 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-500"
                >
                  {getUnits().map((unit) => (
                    <option key={unit.key} value={unit.key}>
                      {unit.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


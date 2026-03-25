import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

export const StatCard = ({ title, value, icon: Icon, trend, trendValue, format = 'number' }) => {
  const valueRef = useRef(null);

  useEffect(() => {
    // GSAP Number Counter animation
    if (typeof value === 'number') {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: value,
        duration: 1.5,
        ease: 'power2.out',
        onUpdate: () => {
          if (valueRef.current) {
            // Format to currency or simple number depending on the context
            if (format === 'currency') {
               valueRef.current.innerText = obj.val.toLocaleString('en-IN', {
                 style: 'currency',
                 currency: 'INR',
                 minimumFractionDigits: 2,
                 maximumFractionDigits: 2
               });
            } else {
               valueRef.current.innerText = Math.round(obj.val).toLocaleString('en-IN');
            }
          }
        }
      });
    }
  }, [value, format]);

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
      className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">{title}</h3>
        <div className="p-2 bg-slate-50 rounded-lg">
          <Icon size={20} className="text-blue-600" />
        </div>
      </div>
      <div>
        {typeof value === "number" ? (
          <span ref={valueRef} className="text-3xl font-bold text-slate-800">
             {format === 'currency' ? '₹0.00' : '0'}
          </span>
        ) : (
          <span className="text-3xl font-bold text-slate-800">{value}</span>
        )}
      </div>
      {trend && (
        <div className="mt-4 flex items-center text-sm">
          <span className={`font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>
            {trend === 'up' ? '↑' : '↓'} {trendValue}
          </span>
          <span className="text-slate-400 ml-2">vs last month</span>
        </div>
      )}
    </motion.div>
  );
};

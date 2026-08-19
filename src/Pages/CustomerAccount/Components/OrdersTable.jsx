// src/Components/OrdersTable.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { COLORS } from './CustomerAccount.styles';

const OrdersTable = ({ orders, onViewDetails }) => {
  const navigate = useNavigate();
  
  const statusMap = { 
    delivered: { label: 'تحویل شده', color: COLORS.success, bg: '#e8f5ee' }, 
    processing: { label: 'در حال ارسال', color: COLORS.warm, bg: '#fef0e8' }, 
    pending: { label: 'در انتظار', color: COLORS.primaryLight, bg: '#f0f3ec' } 
  };
  
  const handleViewDetails = (order) => {
    // اگر تابع onViewDetails از والد ارسال شده، آن را صدا بزن
    if (onViewDetails) {
      onViewDetails(order);
    }
    // هدایت به صفحه سفارش با شناسه سفارش
    navigate(`/order/${order.id}`);
  };
  
  return (
    <div className="w-full overflow-x-auto rounded-lg" style={{ WebkitOverflowScrolling: 'touch' }}>
      <table className="w-full min-w-[640px] text-sm md:min-w-0">
        <thead>
          <tr style={{ background: COLORS.primaryBg }}>
            <th className="whitespace-nowrap rounded-tr-lg px-3 py-2.5 text-right text-xs font-semibold" style={{ color: COLORS.text }}>شناسه</th>
            <th className="whitespace-nowrap px-3 py-2.5 text-right text-xs font-semibold" style={{ color: COLORS.text }}>تاریخ</th>
            <th className="whitespace-nowrap px-3 py-2.5 text-right text-xs font-semibold" style={{ color: COLORS.text }}>مبلغ کل</th>
            <th className="hidden whitespace-nowrap px-3 py-2.5 text-right text-xs font-semibold sm:table-cell" style={{ color: COLORS.text }}>پرداخت</th>
            <th className="hidden whitespace-nowrap px-3 py-2.5 text-right text-xs font-semibold sm:table-cell" style={{ color: COLORS.text }}>تحویل</th>
            <th className="whitespace-nowrap rounded-tl-lg px-3 py-2.5 text-center text-xs font-semibold" style={{ color: COLORS.text }}>جزئیات</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => {
            const status = statusMap[order.status] || statusMap.pending;
            return (
              <tr key={order.id} className="border-b last:border-b-0 transition-colors hover:bg-[#fafcf8]" style={{ borderColor: COLORS.border }}>
                <td className="whitespace-nowrap px-3 py-2.5 text-xs font-medium" style={{ color: COLORS.text }}>{order.id}</td>
                <td className="whitespace-nowrap px-3 py-2.5 text-xs" style={{ color: COLORS.primaryLight }}>{order.date}</td>
                <td className="whitespace-nowrap px-3 py-2.5 text-xs font-medium" style={{ color: COLORS.text }}>{order.total}</td>
                <td className="hidden whitespace-nowrap px-3 py-2.5 text-xs sm:table-cell">
                  <span 
                    className={`rounded-full px-2 py-0.5 ${order.paid === 'بله' ? 'text-white' : ''}`} 
                    style={order.paid === 'بله' ? { background: COLORS.success } : { color: COLORS.primaryLight, border: `1px solid ${COLORS.border}` }}
                  >
                    {order.paid}
                  </span>
                </td>
                <td className="hidden whitespace-nowrap px-3 py-2.5 text-xs sm:table-cell">
                  <span className="rounded-full px-2 py-0.5" style={{ color: status.color, backgroundColor: status.bg, border: `1px solid ${status.color}20` }}>
                    {order.delivered}
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-2.5 text-center">
                  <button 
                    onClick={() => handleViewDetails(order)} 
                    className="rounded-lg px-3 py-1.5 text-xs text-white transition-all hover:shadow-md active:scale-95" 
                    style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})` }}
                  >
                    جزئیات
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
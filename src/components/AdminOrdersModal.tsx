import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Search,
  RefreshCw,
  Phone,
  MapPin,
  Truck,
  CheckCircle,
  Trash2,
  Download,
  AlertCircle,
  Lock,
  Package,
  Radio,
  Sparkles,
} from 'lucide-react';

export interface OrderItem {
  id: string;
  orderNumber: string;
  bundleId: string;
  bundleName: string;
  quantity: number;
  totalPrice: number;
  customerName: string;
  phone: string;
  address: string;
  note: string;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: '주문완료' | '배송준비' | '배송중' | '배송완료' | string;
  createdAt: string;
}

interface AdminOrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminOrdersModal: React.FC<AdminOrdersModalProps> = ({ isOpen, onClose }) => {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [notification, setNotification] = useState<string | null>(null);
  const [newOrderAlert, setNewOrderAlert] = useState<string | null>(null);

  const prevOrderIdsRef = useRef<Set<string>>(new Set());

  const fetchOrders = async (silent = false) => {
    if (!silent) setIsLoading(true);
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data.success && Array.isArray(data.orders)) {
        const fetchedOrders: OrderItem[] = data.orders;

        // Check for new orders
        if (prevOrderIdsRef.current.size > 0) {
          const newItems = fetchedOrders.filter((o) => !prevOrderIdsRef.current.has(o.id));
          if (newItems.length > 0) {
            setNewOrderAlert(`🔔 새 주문 ${newItems.length}건이 들어왔습니다! (${newItems[0].customerName} 님)`);
            setTimeout(() => setNewOrderAlert(null), 5000);
          }
        }

        // Update ref
        const newSet = new Set<string>();
        fetchedOrders.forEach((o) => newSet.add(o.id));
        prevOrderIdsRef.current = newSet;

        setOrders(fetchedOrders);
      }
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      if (!silent) setIsLoading(false);
    }
  };

  // Initial fetch and 2-second Auto Polling for real-time order detection
  useEffect(() => {
    if (isOpen) {
      fetchOrders();
      const intervalId = setInterval(() => {
        fetchOrders(true);
      }, 2000);

      return () => clearInterval(intervalId);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderStatus: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        showNotify(`주문상태가 '${newStatus}'(으)로 전환되었습니다.`);
        fetchOrders(true);
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleDeleteOrder = async (orderId: string, name: string) => {
    if (!confirm(`${name} 님의 주문을 삭제/취소하시겠습니까?`)) return;
    try {
      const res = await fetch(`/api/orders/${orderId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showNotify('주문이 삭제되었습니다.');
        fetchOrders(true);
      }
    } catch (err) {
      console.error('Failed to delete order:', err);
    }
  };

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // CSV Export
  const handleExportCsv = () => {
    if (orders.length === 0) return;
    const headers = ['주문번호', '주문일시', '주문자명', '연락처', '배송지주소', '상품명', '수량', '금액', '상태', '요청사항'];
    const rows = orders.map((o) => [
      o.orderNumber,
      new Date(o.createdAt).toLocaleString('ko-KR'),
      o.customerName,
      o.phone,
      `"${o.address}"`,
      `"${o.bundleName}"`,
      o.quantity,
      o.totalPrice,
      o.orderStatus,
      `"${o.note}"`,
    ]);

    const csvContent =
      '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `판매자_주문관리_목록_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Orders
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.customerName.includes(searchQuery) ||
      o.phone.includes(searchQuery) ||
      o.orderNumber.includes(searchQuery) ||
      o.address.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || o.orderStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.totalPrice) || 0), 0);
  const shippingCount = orders.filter((o) => o.orderStatus === '배송중').length;
  const completedCount = orders.filter((o) => o.orderStatus === '배송완료').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-[#FBF8F3] rounded-3xl border-2 border-stone-300 shadow-2xl my-4 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Top Bar */}
        <div className="bg-[#1B4332] text-[#FBF8F3] px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-emerald-800 text-amber-300 rounded-xl">
              <Lock className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black">판매자 실시간 주문 관리</h2>
                {/* Live Auto-Polling Indicator */}
                <span className="inline-flex items-center gap-1.5 bg-emerald-800 text-emerald-200 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-700 animate-pulse">
                  <Radio className="w-3 h-3 text-emerald-400" />
                  <span>실시간 자동 수신 중</span>
                </span>
              </div>
              <p className="text-xs text-emerald-200 font-medium">새 주문이 들어오면 새로고침 없이 표에 즉시 표시됩니다.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => fetchOrders(false)}
              className="p-2 bg-emerald-800 hover:bg-emerald-700 text-emerald-100 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold"
              title="즉시 수동 새로고침"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">새로고침</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-emerald-200 hover:text-white rounded-xl hover:bg-emerald-800 transition-colors cursor-pointer"
              aria-label="닫기"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* New Order Realtime Notification Alert Banner */}
        {newOrderAlert && (
          <div className="bg-amber-400 text-stone-900 px-6 py-2.5 text-sm font-black flex items-center justify-between shadow-md animate-bounce">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-stone-900" />
              <span>{newOrderAlert}</span>
            </div>
            <span className="text-xs bg-stone-900 text-white px-2 py-0.5 rounded-md">자동 추가됨</span>
          </div>
        )}

        {/* Action Notification Toast */}
        {notification && (
          <div className="bg-emerald-100 text-emerald-900 border-b border-emerald-300 px-6 py-2 text-xs sm:text-sm font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-emerald-700" />
            <span>{notification}</span>
          </div>
        )}

        {/* Summary Stats Header Bar */}
        <div className="bg-[#F4EFE6] p-4 border-b border-stone-300 grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0">
          <div className="bg-[#FBF8F3] p-3 rounded-2xl border border-stone-300">
            <span className="text-xs font-extrabold text-stone-500 block">전체 접수 주문</span>
            <span className="text-2xl font-black text-stone-900 mt-0.5 block">{orders.length}건</span>
          </div>
          <div className="bg-[#FBF8F3] p-3 rounded-2xl border border-stone-300">
            <span className="text-xs font-extrabold text-stone-500 block">총 누적 결제금액</span>
            <span className="text-2xl font-black text-[#1B4332] mt-0.5 block">
              {totalRevenue.toLocaleString()}원
            </span>
          </div>
          <div className="bg-[#FBF8F3] p-3 rounded-2xl border border-stone-300">
            <span className="text-xs font-extrabold text-stone-500 block">배송중 / 배송완료</span>
            <span className="text-2xl font-black text-blue-900 mt-0.5 block">
              {shippingCount}건 / {completedCount}건
            </span>
          </div>
          <div className="bg-[#FBF8F3] p-3 rounded-2xl border border-stone-300 flex items-center justify-between">
            <div>
              <span className="text-xs font-extrabold text-stone-500 block">주문 데이터 내보내기</span>
              <span className="text-xs text-stone-700 font-bold">엑셀/CSV 백업</span>
            </div>
            <button
              onClick={handleExportCsv}
              className="bg-[#1B4332] text-white px-3 py-2 rounded-xl text-xs font-bold hover:bg-[#2D6A4F] transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>다운로드</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Inputs */}
        <div className="p-4 pb-2 space-y-3 shrink-0">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="주문번호, 주문자명, 연락처, 주소 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F4EFE6] border border-stone-300 rounded-xl pl-9 pr-3 py-2 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
              {['all', '주문완료', '배송준비', '배송중', '배송완료'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
                    statusFilter === status
                      ? 'bg-[#1B4332] text-white shadow-xs'
                      : 'bg-[#F4EFE6] text-stone-700 hover:bg-stone-300'
                  }`}
                >
                  {status === 'all' ? '전체 주문' : status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SELLER ORDERS DATA TABLE */}
        <div className="p-4 pt-2 overflow-x-auto overflow-y-auto flex-1">
          {isLoading && orders.length === 0 ? (
            <div className="text-center py-12 text-stone-500 font-bold">주문 데이터를 불러오는 중...</div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-12 bg-[#F4EFE6] rounded-2xl border border-dashed border-stone-300">
              <p className="text-lg font-bold text-stone-600">접수된 주문이 없습니다.</p>
            </div>
          ) : (
            <div className="bg-[#FBF8F3] rounded-2xl border border-stone-300 overflow-hidden shadow-xs">
              <table className="w-full text-left border-collapse min-w-[760px]">
                {/* Table Header */}
                <thead>
                  <tr className="bg-[#1B4332] text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider">
                    <th className="p-3.5 pl-4 border-b border-emerald-800">주문번호 / 일시</th>
                    <th className="p-3.5 border-b border-emerald-800">주문자 정보 (연락처 / 배송지)</th>
                    <th className="p-3.5 border-b border-emerald-800">주문 상품</th>
                    <th className="p-3.5 border-b border-emerald-800">결제 금액</th>
                    <th className="p-3.5 border-b border-emerald-800 text-center">상태 변경 관리</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-stone-200 text-sm font-medium text-stone-800">
                  {filteredOrders.map((order) => {
                    const isNew = prevOrderIdsRef.current.has(order.id);
                    return (
                      <tr
                        key={order.id}
                        className="hover:bg-emerald-50/60 transition-colors bg-[#FBF8F3] odd:bg-[#F4EFE6]/40"
                      >
                        {/* 1. 주문번호 / 일시 */}
                        <td className="p-3.5 pl-4 align-top space-y-1">
                          <div className="font-mono text-xs font-black bg-[#1B4332] text-[#FBF8F3] px-2.5 py-1 rounded-md inline-block">
                            {order.orderNumber}
                          </div>
                          <div className="text-xs text-stone-500 font-bold block">
                            {new Date(order.createdAt).toLocaleString('ko-KR')}
                          </div>
                        </td>

                        {/* 2. 주문자 정보 */}
                        <td className="p-3.5 align-top space-y-1 max-w-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-black text-base text-stone-900">{order.customerName} 님</span>
                            <a
                              href={`tel:${order.phone}`}
                              className="inline-flex items-center gap-1 text-xs text-emerald-900 bg-emerald-100 hover:bg-emerald-200 px-2 py-0.5 rounded-md font-bold transition-colors"
                              title="전화 걸기"
                            >
                              <Phone className="w-3 h-3 text-emerald-800" />
                              <span>{order.phone}</span>
                            </a>
                          </div>

                          <div className="text-xs font-bold text-stone-700 flex items-start gap-1">
                            <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                            <span className="line-clamp-2">{order.address}</span>
                          </div>

                          {order.note && (
                            <div className="text-xs text-stone-500 font-medium italic">
                              요청: {order.note}
                            </div>
                          )}
                        </td>

                        {/* 3. 주문 상품 */}
                        <td className="p-3.5 align-top">
                          <div className="font-black text-stone-900 text-sm sm:text-base">
                            {order.bundleName}
                          </div>
                          <div className="text-xs text-emerald-800 font-bold mt-0.5">
                            수량: {order.quantity}세트
                          </div>
                        </td>

                        {/* 4. 결제 금액 */}
                        <td className="p-3.5 align-top">
                          <div className="font-black text-[#1B4332] text-base sm:text-lg">
                            {Number(order.totalPrice).toLocaleString()}원
                          </div>
                          <div className="text-xs text-stone-500 font-medium">
                            무료배송
                          </div>
                        </td>

                        {/* 5. 상태 변경 버튼들 ("배송중", "배송완료" 빠른 변경) */}
                        <td className="p-3.5 align-top text-center space-y-2">
                          {/* Current Status Badge */}
                          <div className="inline-block">
                            <span
                              className={`text-xs font-black px-3 py-1 rounded-full border shadow-xs ${
                                order.orderStatus === '배송완료'
                                  ? 'bg-emerald-100 text-[#1B4332] border-emerald-300'
                                  : order.orderStatus === '배송중'
                                  ? 'bg-blue-100 text-blue-900 border-blue-300'
                                  : order.orderStatus === '배송준비'
                                  ? 'bg-purple-100 text-purple-900 border-purple-300'
                                  : 'bg-amber-100 text-amber-900 border-amber-300'
                              }`}
                            >
                              {order.orderStatus}
                            </span>
                          </div>

                          {/* Quick Status Action Buttons */}
                          <div className="flex flex-wrap items-center justify-center gap-1">
                            <button
                              onClick={() => handleUpdateStatus(order.id, '배송준비')}
                              className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                order.orderStatus === '배송준비'
                                  ? 'bg-purple-700 text-white'
                                  : 'bg-stone-200 hover:bg-stone-300 text-stone-800'
                              }`}
                              title="배송준비로 변경"
                            >
                              📦 배송준비
                            </button>

                            <button
                              onClick={() => handleUpdateStatus(order.id, '배송중')}
                              className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                order.orderStatus === '배송중'
                                  ? 'bg-blue-700 text-white'
                                  : 'bg-blue-100 hover:bg-blue-200 text-blue-900'
                              }`}
                              title="배송중으로 변경"
                            >
                              🚚 배송중
                            </button>

                            <button
                              onClick={() => handleUpdateStatus(order.id, '배송완료')}
                              className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                order.orderStatus === '배송완료'
                                  ? 'bg-emerald-800 text-white'
                                  : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900'
                              }`}
                              title="배송완료로 변경"
                            >
                              ✅ 배송완료
                            </button>

                            <button
                              onClick={() => handleDeleteOrder(order.id, order.customerName)}
                              className="p-1 text-stone-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer ml-1"
                              title="주문 삭제"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

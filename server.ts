import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Persistent JSON Storage setup
const DATA_DIR = path.resolve(process.cwd(), 'data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Pre-seed sample orders if empty (including user's exact order: 엄정옥 님)
if (!fs.existsSync(ORDERS_FILE)) {
  const initialOrders = [
    {
      id: 'ORD-784081',
      orderNumber: 'ORD-784081',
      bundleId: 'bundle-2',
      bundleName: '2박스 세트 (60포 / 2개월분)',
      quantity: 1,
      totalPrice: 72000,
      customerName: '엄정옥',
      phone: '01044106063',
      address: '충주시 충인6길29-1',
      note: '문 앞에 놓아주세요',
      paymentMethod: 'card',
      paymentStatus: '결제완료',
      orderStatus: '주문완료',
      createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    },
    {
      id: 'ORD-109283',
      orderNumber: 'ORD-109283',
      bundleId: 'bundle-3',
      bundleName: '3박스 세트 (90포 / 3개월분)',
      quantity: 1,
      totalPrice: 102000,
      customerName: '김철수',
      phone: '01012345678',
      address: '서울시 서초구 반포대로 12',
      note: '부재시 경비실에 보관바랍니다',
      paymentMethod: 'kakaopay',
      paymentStatus: '결제완료',
      orderStatus: '배송준비',
      createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    }
  ];
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(initialOrders, null, 2), 'utf-8');
}

function readOrders() {
  try {
    const data = fs.readFileSync(ORDERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function writeOrders(orders: any) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8');
}

// REST API Endpoints
app.get('/api/orders', (req, res) => {
  const orders = readOrders();
  res.json({ success: true, orders });
});

app.post('/api/orders', (req, res) => {
  const { bundleId, bundleName, quantity, totalPrice, customerName, phone, address, note, paymentMethod } = req.body;

  if (!customerName || !phone || !address) {
    return res.status(400).json({ success: false, message: '주문자 필수 정보가 누락되었습니다.' });
  }

  const orders = readOrders();
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomSuffix = Math.floor(100000 + Math.random() * 900000);
  const orderNumber = `ORD-${dateStr}-${randomSuffix}`;

  const newOrder = {
    id: orderNumber,
    orderNumber,
    bundleId: bundleId || 'bundle-2',
    bundleName: bundleName || '2박스 세트 (60포 / 2개월분)',
    quantity: Number(quantity) || 1,
    totalPrice: Number(totalPrice) || 72000,
    customerName,
    phone,
    address,
    note: note || '문 앞에 놓아주세요',
    paymentMethod: paymentMethod || 'card',
    paymentStatus: '결제완료',
    orderStatus: '주문완료',
    createdAt: new Date().toISOString(),
  };

  orders.unshift(newOrder);
  writeOrders(orders);

  res.status(201).json({ success: true, order: newOrder });
});

app.patch('/api/orders/:id/status', (req, res) => {
  const { id } = req.params;
  const { orderStatus } = req.body;

  const orders = readOrders();
  const orderIndex = orders.findIndex((o: any) => o.id === id || o.orderNumber === id);

  if (orderIndex === -1) {
    return res.status(404).json({ success: false, message: '주문을 찾을 수 없습니다.' });
  }

  orders[orderIndex].orderStatus = orderStatus;
  writeOrders(orders);

  res.json({ success: true, order: orders[orderIndex] });
});

app.delete('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  let orders = readOrders();
  orders = orders.filter((o: any) => o.id !== id && o.orderNumber !== id);
  writeOrders(orders);
  res.json({ success: true, message: '주문이 취소되었습니다.' });
});

// Vite Middleware integration for dev / static for prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(process.cwd(), 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Express server running on http://localhost:${PORT}`);
  });
}

startServer();

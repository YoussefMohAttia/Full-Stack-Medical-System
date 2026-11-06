import nunjucks from 'nunjucks/browser/nunjucks-slim';
import templates from '../generated/templates.js';
import info from '../data/product-info.json';
import { env } from 'cloudflare:workers';

const renderer = new nunjucks.Environment(new nunjucks.PrecompiledLoader(templates as any), { autoescape: true });
type CatalogueProduct = {product_id:string;image_key?:string|null;description_en?:string|null;description_ar?:string|null};
export function productInfo(product:CatalogueProduct) {
  const original=(info as Record<string,Record<string,unknown>>)[product.product_id] || {};
  const supplied=product.description_en||product.description_ar;
  return {...original,
    category:original.category||['XPharma product','منتج إكس فارما'],
    description:supplied?[product.description_en||product.description_ar,product.description_ar||product.description_en]:original.description||['Contact XPharma for information about this product.','تواصل مع إكس فارما للحصول على معلومات المنتج.'],
    note:original.note||['For use and suitability, follow the package directions or ask a pharmacist.','اتبع تعليمات العبوة أو استشر الصيدلي لمعرفة طريقة الاستخدام ومدى الملاءمة.'],
    image:product.image_key?`/media/products/${encodeURIComponent(product.product_id)}`:original.image
  };
}
renderer.addFilter('format', (_fmt: string, value: number) => Number(value).toFixed(2));
renderer.addFilter('date_display', (value: unknown) => String(value ?? '').slice(0, 10));
renderer.addFilter('tojson', (value: unknown) => new nunjucks.runtime.SafeString(JSON.stringify(value).replace(/</g, '\\u003c')));
const routes: Record<string, string> = {
  index: '/', about: '/about', browse_products: '/customer/search',
  customer_register: '/customer/register', customer_login: '/customer/login', customer_logout: '/customer/logout',
  customer_dashboard: '/customer/dashboard', verify_account: '/customer/verify', resend_verification: '/customer/verify/resend',
  admin_login: '/admin/login', admin_logout: '/admin/logout', admin_dashboard: '/admin/dashboard',
  add_product: '/admin/products/add', view_reports: '/admin/reports'
};
export function render(name: string, context: Record<string, unknown> = {}) {
  const vars = {
    current_year: new Date().getFullYear(),
    staging: (env as unknown as Record<string, string>).IS_STAGING === 'true',
    product_info: info,
    order_labels: {active:['Active','قيد التنفيذ'],pending_verification:['Pending verification','بانتظار التحقق'],rejected:['Payment rejected','تم رفض الدفع'],completed:['Completed','مكتمل'],cancelled:['Cancelled','ملغي']},
    payment_labels: {pending_verification:['Pending verification','بانتظار التحقق'],verified:['Verified','تم التحقق'],rejected:['Rejected','مرفوض'],cash_on_collection:['Cash on collection','الدفع عند الاستلام'],cash_paid:['Cash received','تم استلام النقد'],pending:['Pending','قيد الانتظار']},
    session: {},
    request: { args: {}, form: {} },
    csrf_token: '',
    get_flashed_messages: () => [],
    lookup: (object: Record<string, unknown> | undefined, key: string, fallback: unknown = null) => object?.[key] ?? fallback,
    url_for: (endpoint: string, parameter?: string | number) => {
      const segment = encodeURIComponent(String(parameter ?? ''));
      const dynamic: Record<string, string> = {static: String(parameter||'').startsWith('/media/products/')?String(parameter):`/static/${parameter}`, product_detail: `/customer/products/${segment}`, reserve_product: `/customer/reserve/${segment}`, cancel_reservation: `/customer/reservation/cancel/${segment}`, admin_payment_proof: `/admin/reservations/${segment}/payment-proof`};
      return dynamic[endpoint] ?? routes[endpoint] ?? '/';
    },
    ...context,
  };
  return renderer.render(name, vars);
}


import { ProductList } from './components/ProductList';
import { DispensaryProduct } from './components/types';

const MOCK_PRODUCTS: DispensaryProduct[] = [
  {
    id: '1',
    name: 'Blue Dream',
    thc: '20%',
    type: 'Hybrid',
    description: 'Un híbrido de predominancia sativa conocido por su dulce aroma a bayas y una relajación de cuerpo completo con una suave vigorización cerebral.'
  },
  {
    id: '2',
    name: 'Sour Diesel',
    thc: '22%',
    type: 'Sativa',
    description: 'De acción rápida y energizante, Sour Diesel tiene un aroma penetrante a diesel y efectos duraderos perfectos para el uso diurno.'
  },
  {
    id: '3',
    name: 'Granddaddy Purple',
    thc: '19%',
    type: 'Indica',
    description: 'Un famoso cruce índica que hereda un complejo aroma a uva y bayas. Perfecto para el manejo del dolor y la relajación.'
  },
  {
    id: '4',
    name: 'OG Kush',
    thc: '23%',
    type: 'Hybrid',
    description: 'Una cepa legendaria con un perfil de terpenos único que cuenta con un complejo aroma a combustible, mofeta y especias.'
  }
];

export default function DispensaryPage() {
  return (
    <div className="space-y-6">
      <ProductList products={MOCK_PRODUCTS} />
    </div>
  );
}

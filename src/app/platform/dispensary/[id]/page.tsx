import Link from 'next/link';
import { DispensaryProduct } from '../components/types';

// In a real app, this would be a server action or API call
const getProduct = (id: string): DispensaryProduct | undefined => {
  const products: DispensaryProduct[] = [
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
  return products.find(p => p.id === id);
};

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = getProduct(params.id);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <h2 className="text-2xl font-bold mb-4">Producto no encontrado</h2>
        <Link href="/platform/dispensary" className="text-primary hover:underline">
          Volver al Dispensario
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link 
        href="/platform/dispensary" 
        className="inline-flex items-center text-sm text-muted-foreground hover:text-white mb-8 transition-colors"
      >
        ← Volver al Dispensario
      </Link>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-8 md:p-12">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <h1 className="text-4xl font-bold text-white">{product.name}</h1>
            <span className="bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
              {product.type}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-2">Potencia</h3>
                  <p className="text-2xl font-medium text-white">{product.thc} THC</p>
                </div>
                
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-2">Descripción</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="pt-8">
                  <button className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-lg transition-colors">
                    Añadir a Reservación
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-black/20 rounded-xl aspect-square flex items-center justify-center border border-border/50">
              <span className="text-muted-foreground">Imagen del Producto</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

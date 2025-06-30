
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Search, Star, Package, Truck, CreditCard } from "lucide-react";

const ClientShop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<number[]>([]);

  const products = [
    {
      id: 1,
      name: "Survival Kit Pro",
      description: "Kompletní sada pro přežití obsahující všechny základní nástroje",
      price: 2490,
      originalPrice: 2890,
      category: "equipment",
      rating: 4.8,
      reviews: 156,
      image: "/lovable-uploads/48d2055d-26ae-4487-8a7e-bb8316e519c0.png",
      inStock: true,
      discount: 14,
      featured: true
    },
    {
      id: 2,
      name: "Taktický batoh 45L",
      description: "Odolný batoh s modulárním systémem MOLLE",
      price: 1890,
      originalPrice: null,
      category: "equipment",
      rating: 4.6,
      reviews: 89,
      image: "/lovable-uploads/5088dbd5-a23d-4216-ad5c-8d0ea388278e.png",
      inStock: true,
      discount: 0,
      featured: false
    },
    {
      id: 3,
      name: "Multitool Professional",
      description: "22 funkcí v jednom nástroji, kvalitní ocel",
      price: 890,
      originalPrice: 1190,
      category: "tools",
      rating: 4.9,
      reviews: 234,
      image: "/lovable-uploads/b831edc6-684d-42f5-934a-b4f7499bf30d.png",
      inStock: true,
      discount: 25,
      featured: true
    },
    {
      id: 4,
      name: "Filtr na vodu LifeStraw",
      description: "Přenosný filtr odstraňující 99.9% bakterií",
      price: 690,
      originalPrice: null,
      category: "water",
      rating: 4.7,
      reviews: 412,
      image: "/lovable-uploads/ca891b58-ca0e-4dc9-a171-a19d9cc6d81b.png",
      inStock: false,
      discount: 0,
      featured: false
    },
    {
      id: 5,
      name: "Kurz online: Základy přežití",
      description: "6 hodinový online kurz s certifikátem",
      price: 1290,
      originalPrice: 1590,
      category: "courses",
      rating: 4.5,
      reviews: 78,
      image: "/lovable-uploads/f562b534-f3b9-4e56-8f57-8b8b7fdef032.png",
      inStock: true,
      discount: 19,
      featured: false
    },
    {
      id: 6,
      name: "Záchranná deka",
      description: "Reflexní deka pro udržení tělesné teploty",
      price: 120,
      originalPrice: null,
      category: "equipment",
      rating: 4.3,
      reviews: 67,
      image: "/lovable-uploads/019e2001-f49b-46c7-b8af-c84d58987b99.png",
      inStock: true,
      discount: 0,
      featured: false
    }
  ];

  const categories = [
    { id: 'all', name: 'Vše', count: products.length },
    { id: 'equipment', name: 'Vybavení', count: products.filter(p => p.category === 'equipment').length },
    { id: 'tools', name: 'Nástroje', count: products.filter(p => p.category === 'tools').length },
    { id: 'water', name: 'Voda', count: products.filter(p => p.category === 'water').length },
    { id: 'courses', name: 'Kurzy', count: products.filter(p => p.category === 'courses').length }
  ];

  const filterProducts = (category: string) => {
    let filtered = products;
    
    if (category !== 'all') {
      filtered = filtered.filter(product => product.category === category);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const addToCart = (productId: number) => {
    setCart([...cart, productId]);
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(id => id !== productId));
  };

  const isInCart = (productId: number) => {
    return cart.includes(productId);
  };

  const getCartTotal = () => {
    return cart.reduce((total, productId) => {
      const product = products.find(p => p.id === productId);
      return total + (product?.price || 0);
    }, 0);
  };

  const ProductCard = ({ product }: { product: typeof products[0] }) => (
    <Card key={product.id} className="border-rust-800/30 hover:border-rust-600/50 transition-all">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        {product.discount > 0 && (
          <Badge className="absolute top-2 left-2 bg-red-600">
            -{product.discount}%
          </Badge>
        )}
        {product.featured && (
          <Badge className="absolute top-2 right-2 bg-orange-600">
            Doporučené
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-foreground text-lg">{product.name}</h3>
            <p className="text-sm text-muted-foreground">{product.description}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium">{product.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">({product.reviews} hodnocení)</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-rust-400">{product.price.toLocaleString()} Kč</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {product.originalPrice.toLocaleString()} Kč
                </span>
              )}
            </div>
            {!product.inStock && (
              <Badge variant="outline" className="text-red-600 border-red-600">
                Nedostupné
              </Badge>
            )}
          </div>
          
          <div className="flex gap-2">
            {product.inStock ? (
              <Button 
                onClick={() => isInCart(product.id) ? removeFromCart(product.id) : addToCart(product.id)}
                className={`flex-1 ${
                  isInCart(product.id) 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-rust-600 hover:bg-rust-700'
                }`}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {isInCart(product.id) ? 'V košíku' : 'Do košíku'}
              </Button>
            ) : (
              <Button disabled className="flex-1">
                <Package className="h-4 w-4 mr-2" />
                Nedostupné
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-orbitron font-bold text-rust-400">
          Shop
        </h1>
        <div className="flex items-center gap-4">
          {cart.length > 0 && (
            <Badge className="bg-rust-600 text-white">
              {cart.length} položek • {getCartTotal().toLocaleString()} Kč
            </Badge>
          )}
          <Button className="bg-rust-600 hover:bg-rust-700">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Košík ({cart.length})
          </Button>
        </div>
      </div>

      {/* Featured Products */}
      {products.filter(p => p.featured).length > 0 && (
        <Card className="border-rust-800/30">
          <CardHeader>
            <CardTitle className="text-rust-400 font-orbitron">Doporučené produkty</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.filter(p => p.featured).map(product => (
                <div key={product.id} className="border border-rust-800/30 rounded-lg p-4">
                  <div className="text-center">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-lg mx-auto mb-2"
                    />
                    <h4 className="font-medium text-foreground">{product.name}</h4>
                    <div className="text-lg font-bold text-rust-400">{product.price.toLocaleString()} Kč</div>
                    {product.originalPrice && (
                      <div className="text-sm text-muted-foreground line-through">
                        {product.originalPrice.toLocaleString()} Kč
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Hledat produkty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          {categories.map(category => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name} ({category.count})
            </TabsTrigger>
          ))}
        </TabsList>
        
        {categories.map(category => (
          <TabsContent key={category.id} value={category.id} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterProducts(category.id).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <Card className="border-rust-800/30 bg-rust-900/20">
          <CardHeader>
            <CardTitle className="text-rust-400 font-orbitron flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Košík
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span className="text-foreground">Celkem: {cart.length} položek</span>
              <span className="text-2xl font-bold text-rust-400">{getCartTotal().toLocaleString()} Kč</span>
            </div>
            <div className="flex gap-3">
              <Button className="flex-1 bg-rust-600 hover:bg-rust-700">
                <CreditCard className="h-4 w-4 mr-2" />
                Přejít k platbě
              </Button>
              <Button variant="outline" className="border-rust-600 text-rust-600 hover:bg-rust-600 hover:text-white">
                <Truck className="h-4 w-4 mr-2" />
                Doprava zdarma nad 2000 Kč
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ClientShop;

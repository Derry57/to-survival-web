
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Search, Calendar, Eye } from "lucide-react";

const ClientInvoices = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const invoices = [
    {
      id: "FA-2024-001",
      courseId: 1,
      courseName: "Urban Survival - Praha",
      date: "2024-02-15",
      dueDate: "2024-03-01",
      amount: 4500,
      status: "paid",
      paymentDate: "2024-02-20",
      downloadUrl: "#"
    },
    {
      id: "FA-2024-002",
      courseId: 2,
      courseName: "Wilderness Expert",
      date: "2024-03-01",
      dueDate: "2024-03-15",
      amount: 6500,
      status: "pending",
      paymentDate: null,
      downloadUrl: "#"
    },
    {
      id: "FA-2024-003",
      courseId: 3,
      courseName: "Medical Training",
      date: "2024-01-10",
      dueDate: "2024-01-25",
      amount: 3200,
      status: "paid",
      paymentDate: "2024-01-18",
      downloadUrl: "#"
    },
    {
      id: "FA-2023-156",
      courseId: 4,
      courseName: "Basic Survival Skills",
      date: "2023-12-05",
      dueDate: "2023-12-20",
      amount: 2800,
      status: "overdue",
      paymentDate: null,
      downloadUrl: "#"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="badge badge-default">Zaplaceno</Badge>;
      case 'pending':
        return <Badge className="badge badge-outline text-orange-600">Čeká na úhradu</Badge>;
      case 'overdue':
        return <Badge className="badge badge-outline text-red-600">Po splatnosti</Badge>;
      default:
        return <Badge variant="outline" className="badge badge-outline">Neznámý</Badge>;
    }
  };

  const filterInvoices = (status: string) => {
    let filtered = invoices;
    
    if (status !== 'all') {
      filtered = filtered.filter(invoice => invoice.status === status);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(invoice => 
        invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.courseName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const InvoiceCard = ({ invoice }: { invoice: typeof invoices[0] }) => (
    <Card key={invoice.id} className="card hover:scale-105 transition-all">
      <CardContent className="card-content p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-semibold text-rust-400">{invoice.id}</h3>
              {getStatusBadge(invoice.status)}
            </div>
            <p className="text-foreground font-medium mb-1">{invoice.courseName}</p>
            <div className="text-sm text-muted-foreground space-y-1">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Vystaveno: {new Date(invoice.date).toLocaleDateString('cs-CZ')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Splatnost: {new Date(invoice.dueDate).toLocaleDateString('cs-CZ')}</span>
              </div>
              {invoice.paymentDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Zaplaceno: {new Date(invoice.paymentDate).toLocaleDateString('cs-CZ')}</span>
                </div>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-rust-400">
              {invoice.amount.toLocaleString()} Kč
            </div>
          </div>
        </div>
        
        <div className="flex gap-2 pt-4 border-t">
          <Button 
            variant="outline" 
            size="sm" 
            className="btn btn-outline btn-sm"
          >
            <Eye className="h-4 w-4 mr-2" />
            Zobrazit
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="btn btn-outline btn-sm"
          >
            <Download className="h-4 w-4 mr-2" />
            Stáhnout PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-rust-400">
          Faktury
        </h1>
        <Badge variant="outline" className="badge badge-outline text-wasteland-400">
          {invoices.length} faktur
        </Badge>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Hledat faktury..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-8"
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">Všechny</TabsTrigger>
          <TabsTrigger value="paid">Zaplacené</TabsTrigger>
          <TabsTrigger value="pending">Čekající</TabsTrigger>
          <TabsTrigger value="overdue">Po splatnosti</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4 mt-6">
          {filterInvoices('all').map(invoice => (
            <InvoiceCard key={invoice.id} invoice={invoice} />
          ))}
        </TabsContent>
        
        <TabsContent value="paid" className="space-y-4 mt-6">
          {filterInvoices('paid').map(invoice => (
            <InvoiceCard key={invoice.id} invoice={invoice} />
          ))}
        </TabsContent>
        
        <TabsContent value="pending" className="space-y-4 mt-6">
          {filterInvoices('pending').map(invoice => (
            <InvoiceCard key={invoice.id} invoice={invoice} />
          ))}
        </TabsContent>
        
        <TabsContent value="overdue" className="space-y-4 mt-6">
          {filterInvoices('overdue').map(invoice => (
            <InvoiceCard key={invoice.id} invoice={invoice} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientInvoices;

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, CreditCard, DollarSign } from "lucide-react";

export default function BillingPage() {
  const invoices = [
    { id: "INV-2026-042", date: "Oct 24, 2026", description: "Cardiology Consultation - Dr. Sarah Jenkins", amount: "$150.00", status: "Paid" },
    { id: "INV-2026-041", date: "Sep 15, 2026", description: "Neurology Follow-up - Dr. Emily Chen", amount: "$120.00", status: "Paid" },
    { id: "INV-2026-040", date: "Aug 10, 2026", description: "Annual Checkup - Dr. Michael Scott", amount: "$90.00", status: "Paid" },
    { id: "INV-2026-039", date: "Aug 10, 2026", description: "Lab Tests - Complete Blood Count", amount: "$45.00", status: "Refunded" },
    { id: "INV-2026-038", date: "Jul 02, 2026", description: "Orthopedic Initial Consult - Dr. Robert Smith", amount: "$180.00", status: "Paid" },
  ];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Billing & Payments</h1>
        <p className="text-muted-foreground">Manage your payment methods and view past invoices.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <Card className="border-border/50 shadow-sm bg-gradient-to-br from-primary to-primary/80 text-primary-foreground relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-primary-foreground/80 font-medium text-sm flex items-center justify-between">
              Total Spent (YTD) <DollarSign className="w-4 h-4 opacity-50" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold font-mono tracking-tight">$540.00</div>
          </CardContent>
        </Card>
        
        <Card className="border-border/50 shadow-sm col-span-1 lg:col-span-2">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" /> Active Payment Method
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-muted p-2 border border-border/50 rounded flex items-center justify-center w-12 h-8">
                <span className="font-bold text-xs italic text-blue-800">VISA</span>
              </div>
              <div>
                <p className="font-semibold text-sm">•••• •••• •••• 4242</p>
                <p className="text-xs text-muted-foreground">Expires 12/28</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Update</Button>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 shadow-sm">
        <CardHeader>
          <CardTitle>Invoice History</CardTitle>
          <CardDescription>All your previous transactions and refunds.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border/50">
                <TableHead>Invoice ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id} className="border-border/50">
                  <TableCell className="font-medium text-xs font-mono">{invoice.id}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{invoice.date}</TableCell>
                  <TableCell className="text-sm max-w-sm truncate">{invoice.description}</TableCell>
                  <TableCell className="text-sm font-semibold font-mono">{invoice.amount}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={
                      invoice.status === "Paid" ? "bg-green-500/10 text-green-500" :
                      "bg-muted text-muted-foreground"
                    }>
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

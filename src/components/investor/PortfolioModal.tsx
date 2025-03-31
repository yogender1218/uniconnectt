
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Portfolio } from "@/services/api";
import { TrendingUp, TrendingDown, Plus, DollarSign, BarChart2, Calendar } from "lucide-react";
import { api } from "@/services/api";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface PortfolioModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  portfolioItems: Portfolio[];
}

const PortfolioModal: React.FC<PortfolioModalProps> = ({
  open,
  onOpenChange,
  portfolioItems,
}) => {
  const [portfolio, setPortfolio] = useState<Portfolio[]>(portfolioItems);
  const [date, setDate] = useState<Date | undefined>(undefined);
  
  const totalInvestment = portfolio.reduce((sum, item) => sum + item.amount, 0);
  const avgPerformance = Math.round(
    portfolio.reduce((sum, item) => sum + item.performance, 0) / 
    portfolio.length * 100
  ) / 100;
  
  const positiveCount = portfolio.filter(item => item.status === 'positive').length;
  const negativeCount = portfolio.filter(item => item.status === 'negative').length;
  
  const handleUpdatePortfolio = async (portfolioId: string, data: Partial<Portfolio>) => {
    try {
      const updatedPortfolio = await api.updatePortfolio(portfolioId, data);
      setPortfolio(prev => 
        prev.map(item => item.id === portfolioId ? updatedPortfolio : item)
      );
      toast.success("Portfolio updated successfully");
    } catch (error) {
      toast.error("Failed to update portfolio");
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[90%] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="mb-6">
          <DialogTitle>Investment Portfolio</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Investment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <DollarSign size={20} />
                </div>
                <p className="text-3xl font-bold">${totalInvestment.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Average Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <BarChart2 size={20} />
                </div>
                <p className={`text-3xl font-bold ${avgPerformance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {avgPerformance >= 0 ? '+' : ''}{avgPerformance}%
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Investment Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="text-green-500" size={20} />
                  <span>{positiveCount} positive</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingDown className="text-red-500" size={20} />
                  <span>{negativeCount} negative</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between mb-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                <Calendar size={16} />
                {date ? (
                  <span>{format(date, "PPP")}</span>
                ) : (
                  <span>Filter by date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>

          <Button className="flex items-center gap-1">
            <Plus size={16} />
            <span>Add Investment</span>
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Investment Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Performance</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {portfolio.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  {item.companyName}
                </TableCell>
                <TableCell>{item.investmentDate}</TableCell>
                <TableCell>${item.amount.toLocaleString()}</TableCell>
                <TableCell className={`font-semibold ${item.performance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {item.performance >= 0 ? '+' : ''}{item.performance}%
                </TableCell>
                <TableCell>
                  <Badge 
                    className={`${
                      item.status === 'positive' 
                        ? 'bg-green-500' 
                        : item.status === 'negative' 
                          ? 'bg-red-500' 
                          : 'bg-yellow-500'
                    }`}
                  >
                    {item.status === 'positive' 
                      ? 'Positive' 
                      : item.status === 'negative' 
                        ? 'Negative' 
                        : 'Neutral'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioModal;

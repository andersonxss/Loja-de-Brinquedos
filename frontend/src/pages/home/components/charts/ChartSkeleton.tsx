import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ChartSkeleton: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="h-5 w-40 bg-muted rounded animate-pulse" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[320px] w-full bg-muted/60 rounded animate-pulse mb-4" />
        <div className="flex gap-2 mt-2">
          <div className="h-4 w-16 bg-muted rounded animate-pulse" />
          <div className="h-4 w-24 bg-muted rounded animate-pulse" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartSkeleton;

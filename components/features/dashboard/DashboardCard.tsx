import React, { ElementType, FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

interface DashboardCardProps {
  title: string;
  IconComponent: ElementType;
  mainText: string;
  subText: string;
  chunkId: string;
}

const DashboardCard: FC<DashboardCardProps> = ({
  title,
  IconComponent,
  mainText,
  subText,
  chunkId,
}) => (
  <Card x-chunk={chunkId}>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-12">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <IconComponent className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{mainText}</div>
      <p className="text-xs text-muted-foreground">{subText}</p>
    </CardContent>
  </Card>
);

export default DashboardCard;

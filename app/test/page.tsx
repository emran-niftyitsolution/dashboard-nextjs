import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function TestPage() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Component Test Page</h1>

      <Card>
        <CardHeader>
          <CardTitle>Test Components</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Button Variants:</h3>
            <div className="flex gap-2 flex-wrap">
              <Button>Default</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="gradient">Gradient</Button>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Button Sizes:</h3>
            <div className="flex gap-2 items-center">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">🔍</Button>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Input Test:</h3>
            <Input placeholder="Test input" />
          </div>

          <div>
            <h3 className="font-medium mb-2">Loading Button:</h3>
            <Button loading>Loading...</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Code2, Play, CheckCircle2, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const CodeEditor = () => {
  const [code, setCode] = useState(`function twoSum(nums, target) {
  // Your solution here
  
}`);
  const [language, setLanguage] = useState("javascript");
  const [testResults, setTestResults] = useState<any[]>([]);

  const handleRunCode = () => {
    // Simulate test results
    setTestResults([
      { input: "[2,7,11,15], target = 9", expected: "[0,1]", actual: "[0,1]", passed: true },
      { input: "[3,2,4], target = 6", expected: "[1,2]", actual: "[1,2]", passed: true },
      { input: "[3,3], target = 6", expected: "[0,1]", actual: "null", passed: false },
    ]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2">
            <Code2 className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">TechKnots</span>
          </Link>
          <div className="flex items-center gap-4">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleRunCode} className="gap-2">
              <Play className="h-4 w-4" />
              Run Code
            </Button>
            <Button variant="outline">Submit</Button>
          </div>
        </div>
      </nav>

      <div className="h-[calc(100vh-73px)] flex">
        {/* Problem Description */}
        <div className="w-1/2 border-r border-border overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <h1 className="text-2xl font-bold">Two Sum</h1>
              <span className="text-xs bg-success/10 text-success px-2 py-1 rounded">Easy</span>
            </div>

            <Tabs defaultValue="description" className="w-full">
              <TabsList>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="editorial">Editorial</TabsTrigger>
                <TabsTrigger value="solutions">Solutions</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-4 space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Problem</h3>
                  <p className="text-muted-foreground">
                    Given an array of integers <code className="bg-muted px-1 py-0.5 rounded">nums</code> and
                    an integer <code className="bg-muted px-1 py-0.5 rounded">target</code>, return indices
                    of the two numbers such that they add up to target.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Example 1:</h3>
                  <Card>
                    <CardContent className="p-4">
                      <pre className="text-sm">
                        <div className="mb-1"><strong>Input:</strong> nums = [2,7,11,15], target = 9</div>
                        <div className="mb-1"><strong>Output:</strong> [0,1]</div>
                        <div className="text-muted-foreground"><strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].</div>
                      </pre>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Example 2:</h3>
                  <Card>
                    <CardContent className="p-4">
                      <pre className="text-sm">
                        <div className="mb-1"><strong>Input:</strong> nums = [3,2,4], target = 6</div>
                        <div><strong>Output:</strong> [1,2]</div>
                      </pre>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Constraints:</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>2 ≤ nums.length ≤ 10⁴</li>
                    <li>-10⁹ ≤ nums[i] ≤ 10⁹</li>
                    <li>-10⁹ ≤ target ≤ 10⁹</li>
                    <li>Only one valid answer exists</li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="editorial">
                <p className="text-muted-foreground">Editorial content will be available here...</p>
              </TabsContent>

              <TabsContent value="solutions">
                <p className="text-muted-foreground">Community solutions will be available here...</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Code Editor */}
        <div className="w-1/2 flex flex-col">
          <div className="flex-1 p-4">
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="h-full font-mono text-sm resize-none"
              placeholder="Write your code here..."
            />
          </div>

          {/* Test Results */}
          {testResults.length > 0 && (
            <div className="border-t border-border p-4 max-h-[300px] overflow-y-auto">
              <h3 className="font-semibold mb-4">Test Results</h3>
              <div className="space-y-2">
                {testResults.map((result, idx) => (
                  <Card key={idx} className={result.passed ? "border-success" : "border-destructive"}>
                    <CardHeader className="p-4">
                      <CardTitle className="text-sm flex items-center gap-2">
                        {result.passed ? (
                          <>
                            <CheckCircle2 className="h-4 w-4 text-success" />
                            <span className="text-success">Test Case {idx + 1} Passed</span>
                          </>
                        ) : (
                          <>
                            <X className="h-4 w-4 text-destructive" />
                            <span className="text-destructive">Test Case {idx + 1} Failed</span>
                          </>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 text-sm">
                      <div className="mb-1"><strong>Input:</strong> {result.input}</div>
                      <div className="mb-1"><strong>Expected:</strong> {result.expected}</div>
                      <div><strong>Actual:</strong> {result.actual}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;

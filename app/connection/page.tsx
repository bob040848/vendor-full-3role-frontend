"use client"
import { ConnectionTest } from '../../components/ConnectionTest';

export default function TestPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Backend Connection Test</h1>
      <ConnectionTest />
    </div>
  );
}
"use client";

import ModuleSelector from "@/components/ModuleSelector";
import VersionCreate from "@/components/VersionCreate";
import VersionHistory from "@/components/VersionHistory";
import VersionTest from "@/components/VersionTest";
import VersionDiff from "@/components/VersionDiff";

export default function VersionPage() {
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Prompt Versioning</h1>
        <ModuleSelector current="version" />
      </div>

      {/* MODULES */}
      <VersionCreate />
      <VersionHistory />
      <VersionTest />
      <VersionDiff />

    </div>
  );
}
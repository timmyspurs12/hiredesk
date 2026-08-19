"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  TASKS,
  latestRun,
  loadRuns,
  saveRun,
  type AdvantageRun,
  type AdvantageTask,
  type RunMode,
} from "@/lib/advantage";

export function AdvantageClient() {
  const [runs, setRuns] = useState<AdvantageRun[]>([]);
  const [taskId, setTaskId] = useState<AdvantageTask["id"]>("hf");
  const [mode, setMode] = useState<RunMode>("with");
  const [started, setStarted] = useState<number | null>(null);
  const [tick, setTick] = useState(0);
  const [costNote, setCostNote] = useState("Gas only · demo path (no on-chain spend)");
  const [quality, setQuality] = useState("Dry run matched the intended repay / move.");

  useEffect(() => {
    setRuns(loadRuns());
  }, []);

  useEffect(() => {
    if (started === null) return;
    const t = setInterval(() => setTick((n) => n + 1), 200);
    return () => clearInterval(t);
  }, [started]);

  const elapsed = started ? (Date.now() - started) / 1000 : 0;
  void tick;

  function stop() {
    if (started === null) return;
    const seconds = Number(((Date.now() - started) / 1000).toFixed(1));
    setRuns(
      saveRun({
        taskId,
        mode,
        seconds,
        costNote,
        quality,
        at: new Date().toISOString(),
      }),
    );
    setStarted(null);
  }

  return (
    <div className="mt-10 space-y-10">
      <section className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-muted">
              <th className="pb-3 pr-4">Task</th>
              <th className="pb-3 pr-4">Without agent</th>
              <th className="pb-3 pr-4">With HIREDESK</th>
              <th className="pb-3">Delta</th>
            </tr>
          </thead>
          <tbody>
            {TASKS.map((task) => {
              const no = latestRun(runs, task.id, "without");
              const yes = latestRun(runs, task.id, "with");
              const delta =
                no && yes ? `${(no.seconds / Math.max(yes.seconds, 0.1)).toFixed(1)}× faster` : "—";
              return (
                <tr key={task.id} className="border-t border-line align-top">
                  <td className="py-4 pr-4">
                    <div className="text-[11px] uppercase tracking-wide text-accent">{task.category}</div>
                    <div className="font-medium">{task.title}</div>
                    <p className="mt-1 text-xs text-muted">{task.goal}</p>
                  </td>
                  <td className="py-4 pr-4 text-muted">{no ? `${no.seconds}s` : "Not recorded"}</td>
                  <td className="py-4 pr-4 text-muted">{yes ? `${yes.seconds}s` : "Not recorded"}</td>
                  <td className="py-4">{delta}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <section className="rounded-2xl border border-line bg-card p-5">
        <h2 className="text-lg font-medium">Record a run</h2>
        <p className="mt-1 text-sm text-muted">
          TermiX wants measured, not invented. Time yourself doing the task both ways. Save once
          per side. Outputs stay in this browser until you paste them into the submission doc.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="text-sm">
            Task
            <select
              value={taskId}
              onChange={(e) => setTaskId(e.target.value as AdvantageTask["id"])}
              className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2"
            >
              {TASKS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.category}: {t.title}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            Mode
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value as RunMode)}
              className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2"
            >
              <option value="with">With HIREDESK</option>
              <option value="without">Without agent (manual)</option>
            </select>
          </label>
        </div>
        <label className="mt-3 block text-sm">
          Cost note
          <input
            value={costNote}
            onChange={(e) => setCostNote(e.target.value)}
            className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2"
          />
        </label>
        <label className="mt-3 block text-sm">
          Output quality
          <input
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
            className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2"
          />
        </label>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {started === null ? (
            <button type="button" onClick={() => setStarted(Date.now())} className="btn-primary btn-primary-inline">
              Start timer
            </button>
          ) : (
            <button type="button" onClick={stop} className="btn-primary btn-primary-inline">
              Stop and save · {elapsed.toFixed(1)}s
            </button>
          )}
          <Link href={TASKS.find((t) => t.id === taskId)!.startHref} className="text-sm text-accent">
            Open this agent →
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {TASKS.map((task) => (
          <div key={task.id} className="rounded-2xl border border-line bg-card p-4 text-sm">
            <div className="text-[11px] uppercase tracking-wide text-muted">{task.category}</div>
            <h3 className="mt-1 font-medium">{task.title}</h3>
            <p className="mt-2 text-xs font-medium text-muted">Without</p>
            <ol className="mt-1 list-decimal space-y-1 pl-4 text-xs text-muted">
              {task.withoutSteps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
            <p className="mt-3 text-xs font-medium text-muted">With HIREDESK</p>
            <ol className="mt-1 list-decimal space-y-1 pl-4 text-xs text-muted">
              {task.withSteps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </div>
        ))}
      </section>
    </div>
  );
}

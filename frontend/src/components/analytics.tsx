"use client";
import { useEffect, useState } from "react";
import { UserGroupIcon, ArrowTrendingUpIcon, BuildingLibraryIcon, BookmarkIcon } from "@heroicons/react/24/outline";

// Strapi endpoint (update to match your actual host)
const API_URL =
  (process.env.NEXT_PUBLIC_API_URL || "https://strapi-backend-4xxv.onrender.com")
  .replace(/\/$/, "") + "/api/user-details?pagination[page]=1&pagination[pageSize]=100";

type User = {
  id: number;
  status?: "active" | "inactive";
  age?: number;
  createdAt?: string;
  branch?: string;
  date_of_birth?: string;
  // ...all other fields
};

export default function DashboardAnalytics() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        // Strapi v4 REST format: data.data is array of objects with 'attributes'
        // YOUR API returns top-level fields directly
        setUsers(data.data || []);
        setLoading(false);
      });
  }, []);

  const totalUsers = users.length;
  // Use .status on user, not user.attributes
  const activeUsers = users.filter((u) => u.status === "active").length;

  // Growth rate: count users created in last 30 days by createdAt
  const now = new Date();
  const newUsers30d = users.filter(
    (u) =>
      u.createdAt &&
      new Date(u.createdAt) >= new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  ).length;
  const growthRate =
    totalUsers === 0 ? 0 : ((newUsers30d / totalUsers) * 100).toFixed(0);

  // Bank branches: unique "branch"
  const branches = Array.from(new Set(users.map((u) => u.branch).filter(Boolean)));
  const branchCoverage =
    branches.length > 0 ? Math.round((branches.length / 10) * 100) : 0;

  // Age: from age (if set) or calculate from date_of_birth
  const computeAge = (user: User) => {
    if (user.age) return user.age;
    if (user.date_of_birth) {
      const dob = new Date(user.date_of_birth);
      const today = new Date();
      return today.getFullYear() - dob.getFullYear() -
        (today.getMonth() < dob.getMonth() ||
        (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
          ? 1
          : 0);
    }
    return 0;
  };
  const avgAge =
    users.length > 0
      ? Math.round(
          users.reduce((sum, u) => sum + (computeAge(u) || 0), 0) / users.length
        )
      : 0;

  // Registration trends - daily counts past 7 days (uses createdAt)
  const registrationTrends = Array(7)
    .fill(0)
    .map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      const count = users.filter((u) => {
        if (!u.createdAt) return false;
        const created = new Date(u.createdAt);
        return (
          created.getFullYear() === date.getFullYear() &&
          created.getMonth() === date.getMonth() &&
          created.getDate() === date.getDate()
        );
      }).length;
      return { date: date.toLocaleDateString(), count };
    });

  // Age distribution
  const ageBuckets = {
    "18-25": 0,
    "26-35": 0,
    "36-50": 0,
    "51+": 0,
  };
  users.forEach((u) => {
    const age = computeAge(u) || 0;
    if (age >= 18 && age <= 25) ageBuckets["18-25"]++;
    else if (age >= 26 && age <= 35) ageBuckets["26-35"]++;
    else if (age >= 36 && age <= 50) ageBuckets["36-50"]++;
    else if (age >= 51) ageBuckets["51+"]++;
  });

  if (loading)
    return (
      <div className="flex w-full h-screen items-center justify-center bg-neutral-950 text-white">
        Loading dashboard...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-white pb-8">
      {/* Hero */}
      <div className="flex flex-col items-center mb-10 pt-8">
        <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm bg-neutral-800 text-neutral-200 shadow font-semibold mb-4">
          <ArrowTrendingUpIcon className="w-5 h-5 mr-2" />
          Dashboard Overview
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-center">
          Real-time Analytics
        </h1>
        <p className="text-lg max-w-2xl text-center mt-3 text-neutral-300">
          Comprehensive insights and statistics about your user management system. Track growth, analyze patterns, and monitor performance in real-time.
        </p>
      </div>
      {/* Stat Cards */}
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-10 max-w-7xl mx-auto">
        <div className="bg-neutral-900 rounded-xl shadow p-6 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-semibold">Total Users</span>
            <UserGroupIcon className="w-8 h-8 text-gray-300" />
          </div>
          <div className="text-3xl font-bold mb-1">{totalUsers}</div>
          <span className="text-sm flex items-center">
            <span className="h-2 w-2 rounded-full bg-green-400 mr-2 inline-block"></span>
            <span className="text-green-400">{activeUsers} Active</span>
          </span>
        </div>
        <div className="bg-neutral-900 rounded-xl shadow p-6 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-semibold">Growth Rate</span>
            <ArrowTrendingUpIcon className="w-8 h-8 text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-blue-400 mb-1">
            {growthRate}%
          </div>
          <div className="w-full h-2 rounded-full bg-neutral-800 mt-2 mb-2">
            <div
              className="h-2 rounded-full bg-blue-400 transition-all duration-500"
              style={{ width: `${growthRate}%` }}
            />
          </div>
          <div className="text-xs text-neutral-400">{newUsers30d} new in 30 days</div>
        </div>
        <div className="bg-neutral-900 rounded-xl shadow p-6 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-semibold">Bank Branches</span>
            <BuildingLibraryIcon className="w-8 h-8 text-green-400" />
          </div>
          <div className="text-3xl font-bold mb-1">{branches.length}</div>
          <span className="text-xs text-green-400">✓ Coverage: {branchCoverage}%</span>
        </div>
        <div className="bg-gradient-to-br from-purple-800/40 to-black rounded-xl shadow p-6 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-semibold">Data Quality</span>
            <BookmarkIcon className="w-8 h-8 text-purple-300" />
          </div>
          <div className="text-3xl font-bold mb-1 text-fuchsia-400">100%</div>
          <div className="w-full h-2 rounded-full bg-neutral-800 mt-2 mb-2">
            <div className="h-2 rounded-full bg-fuchsia-400 transition-all duration-500" style={{ width: `100%` }} />
          </div>
          <div className="text-xs text-neutral-400">Avg Age: {avgAge} years</div>
        </div>
      </div>
      {/* Trend/Charts */}
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto">
        {/* Registration Trends */}
        <div className="bg-neutral-900 rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-2 flex items-center">
            <span className="mr-2">📈</span> Registration Trends
          </h2>
          <div className="text-sm text-neutral-400 mb-2">
            Daily user registrations over the past week
          </div>
          {/* Simple Bar Chart */}
          <div className="flex items-end space-x-2 h-36 mt-4">
            {registrationTrends.map((trend, idx) => (
              <div key={idx} className="flex flex-col items-center flex-1">
                <div className="w-8 h-full flex flex-col justify-end">
                  <div
                    className="bg-blue-500 rounded-t"
                    style={{
                      height: `${(trend.count / Math.max(...registrationTrends.map(t => t.count || 1))) * 90 || 6}px`,
                      minHeight: 6,
                    }}
                  ></div>
                </div>
                <div className="text-xs text-neutral-400 mt-2">
                  {trend.date.split("/").slice(1).join("/")}
                </div>
                <div className="text-xs text-blue-300">{trend.count}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Age Distribution */}
        <div className="bg-neutral-900 rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-2 flex items-center">
            <span className="mr-2">🧑‍💼</span> Age Distribution
          </h2>
          <div className="text-sm text-neutral-400 mb-2">
            User demographics by age groups
          </div>
          <ul className="flex flex-col gap-2 mt-5">
            {Object.entries(ageBuckets).map(([range, count]) => (
              <li key={range} className="flex justify-between px-2">
                <span className="text-blue-200">{range}</span>
                <span>{count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

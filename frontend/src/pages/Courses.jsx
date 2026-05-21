import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, RefreshCw, Bookmark, BookmarkCheck, ChevronDown, ChevronUp } from "lucide-react";
import careerService from "../services/careerService";
import CourseCard from "../components/cards/CourseCard";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import StatusBanner from "../components/ui/StatusBanner";
import useAuth from "../hooks/useAuth";
import { getApiErrorInfo } from "../utils/errorUtils";

export default function Courses() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [savedCourses, setSavedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("recommended");
  const [expandedGaps, setExpandedGaps] = useState({});
  const profileReady = Boolean(user?.profileComplete || user?.skills?.length || user?.education?.length || user?.experience?.length || user?.full_name);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const [recs, saved] = await Promise.all([
        careerService.getRecommendedCourses(),
        careerService.getSavedCourses(),
      ]);
      setRecommendations(recs || []);
      setSavedCourses(saved || []);
      // Expand first gap by default
      if (recs && recs.length > 0) {
        setExpandedGaps({ 0: true });
      }
    } catch (e) {
      const info = getApiErrorInfo(e);
      setError(info.message || "Failed to load courses. Make sure your profile is complete.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const toggleGap = (i) =>
    setExpandedGaps((prev) => ({ ...prev, [i]: !prev[i] }));

  const savedCourseIds = new Set(savedCourses.map((s) => s.course_id));
  const savedIdMap = savedCourses.reduce((acc, s) => {
    acc[s.course_id] = s.saved_course_id;
    return acc;
  }, {});

  const handleSaveToggle = (courseId, isSaved, savedCourseId) => {
    if (isSaved) {
      setSavedCourses((prev) => [
        ...prev,
        { course_id: courseId, saved_course_id: savedCourseId },
      ]);
    } else {
      setSavedCourses((prev) => prev.filter((s) => s.course_id !== courseId));
    }
  };

  const totalCourses = recommendations.reduce(
    (acc, g) => acc + (g.courses?.length || 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-emerald-400" />
            Online Courses
          </h1>
          <p className="text-sm text-muted mt-1">
            Curated courses to bridge your skill gaps and accelerate your career.
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={fetchData}
          disabled={loading}
          className="flex items-center gap-2 text-xs border-slate-800"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {!profileReady && (
        <StatusBanner
          tone="info"
          title="Courses are personalized from your profile"
          message="Complete onboarding so we can recommend the right learning resources for your gaps."
          actionLabel="Complete profile"
          onAction={() => navigate("/onboarding")}
        />
      )}

      {/* Tabs */}
      <div className="flex gap-1 bg-card/60 border border-border/80 rounded-xl p-1 w-fit">
        {[
          { id: "recommended", label: `Recommended (${totalCourses})`, icon: BookOpen },
          { id: "saved", label: `Saved (${savedCourses.length})`, icon: Bookmark },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-primary/10 text-white border border-primary/20"
                  : "text-muted hover:text-white"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {error && (
        <StatusBanner tone="danger" title="Could not load courses" message={error} actionLabel="Retry" onAction={fetchData} />
      )}

      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-card/60 border border-border/80 rounded-2xl p-6 animate-pulse h-48" />
          ))}
        </div>
      ) : (
        <>
          {/* Recommended tab */}
          {activeTab === "recommended" && (
            <div className="space-y-5">
              {recommendations.length === 0 ? (
                <div className="text-center py-16 text-muted">
                  <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p className="text-sm font-medium">No course recommendations yet.</p>
                  <p className="text-xs mt-1">Complete your profile to get personalized course suggestions.</p>
                </div>
              ) : (
                recommendations.map((group, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Card className="p-5">
                      {/* Gap header */}
                      <button
                        onClick={() => toggleGap(i)}
                        className="w-full flex items-center justify-between mb-1"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-rose-400 shrink-0" />
                          <div className="text-left">
                            <span className="text-[10px] text-rose-400 font-bold uppercase tracking-wider block">
                              Skill Gap
                            </span>
                            <h3 className="text-base font-bold text-white">{group.skill_gap}</h3>
                          </div>
                          <span className="text-xs text-muted ml-2">
                            {group.courses?.length} course{group.courses?.length !== 1 ? "s" : ""}
                          </span>
                        </div>
                        {expandedGaps[i] ? (
                          <ChevronUp className="w-4 h-4 text-muted" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-muted" />
                        )}
                      </button>

                      {expandedGaps[i] && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                        >
                          {group.courses?.map((course, j) => (
                            <CourseCard
                              key={course.id || j}
                              course={course}
                              isSavedInitially={savedCourseIds.has(course.id)}
                              savedCourseId={savedIdMap[course.id] || null}
                              onSaveToggle={handleSaveToggle}
                            />
                          ))}
                        </motion.div>
                      )}
                    </Card>
                  </motion.div>
                ))
              )}
            </div>
          )}

          {/* Saved tab */}
          {activeTab === "saved" && (
            <div>
              {savedCourses.length === 0 ? (
                <div className="text-center py-16 text-muted">
                  <BookmarkCheck className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p className="text-sm font-medium">No saved courses yet.</p>
                  <p className="text-xs mt-1">Bookmark courses from the Recommended tab to save them here.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savedCourses.map((saved, i) => (
                    <motion.div
                      key={saved.saved_course_id || i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <CourseCard
                        course={{
                          id: saved.course_id,
                          title: saved.title,
                          platform: saved.platform,
                          url: saved.url,
                          duration_hours: saved.duration_hours,
                          cost_type: saved.cost_type,
                          cost_amount: saved.cost_amount,
                          rating: saved.rating,
                          level: saved.level,
                          skill_tags: saved.skill_tags,
                        }}
                        isSavedInitially={true}
                        savedCourseId={saved.saved_course_id}
                        onSaveToggle={(courseId, isSaved) => {
                          if (!isSaved) {
                            setSavedCourses((prev) =>
                              prev.filter((s) => s.course_id !== courseId)
                            );
                          }
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

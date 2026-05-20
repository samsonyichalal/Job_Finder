import React, { useState } from "react";
import { Star, Clock, ExternalLink, Bookmark, BookmarkCheck } from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import careerService from "../../services/careerService";

export default function CourseCard({ course, isSavedInitially = false, savedCourseId = null, onSaveToggle = null }) {
  const [isSaved, setIsSaved] = useState(isSavedInitially);
  const [sId, setSId] = useState(savedCourseId);
  const [loading, setLoading] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (loading) return;

    setLoading(true);
    try {
      if (isSaved) {
        // Delete saved course if we have savedCourseId
        const activeSId = sId || savedCourseId;
        if (activeSId) {
          await careerService.deleteSavedCourse(activeSId);
          setIsSaved(false);
          setSId(null);
          if (onSaveToggle) onSaveToggle(course.id, false, null);
        } else {
          // If we don't have the saved ID, fetch latest saved list or handle gracefully
          const saved = await careerService.getSavedCourses();
          const match = saved.find(item => item.course_id === course.id);
          if (match) {
            await careerService.deleteSavedCourse(match.saved_course_id);
            setIsSaved(false);
            setSId(null);
            if (onSaveToggle) onSaveToggle(course.id, false, null);
          }
        }
      } else {
        const res = await careerService.saveCourse(course.id, "saved");
        setIsSaved(true);
        if (res && res.saved_course_id) {
          setSId(res.saved_course_id);
          if (onSaveToggle) onSaveToggle(course.id, true, res.saved_course_id);
        } else {
          if (onSaveToggle) onSaveToggle(course.id, true, null);
        }
      }
    } catch (err) {
      console.error("Error saving/deleting course:", err);
    } finally {
      setLoading(false);
    }
  };

  // Star rating generator
  const renderStars = (rating) => {
    const stars = [];
    const floor = Math.floor(rating);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i <= floor ? "fill-amber-400 text-amber-400" : "text-slate-600"
          }`}
        />
      );
    }
    return stars;
  };

  const getPlatformClass = (platform) => {
    const p = platform?.toLowerCase() || "";
    if (p.includes("coursera")) return "bg-blue-600/10 text-blue-400 border-blue-500/20";
    if (p.includes("udemy")) return "bg-purple-600/10 text-purple-400 border-purple-500/20";
    if (p.includes("edx")) return "bg-red-600/10 text-red-400 border-red-500/20";
    return "bg-slate-800/60 text-slate-300 border-slate-700/80";
  };

  return (
    <Card className="flex flex-col h-full bg-slate-900/30 border border-slate-800/80 hover:border-indigo-500/30 transition-all duration-300 overflow-hidden relative group">
      <div className="p-5 flex flex-col flex-1">
        {/* Header Platform & Type */}
        <div className="flex items-center justify-between mb-3">
          <span className={`text-[10px] px-2 py-0.5 rounded-lg border font-bold uppercase tracking-wider ${getPlatformClass(course.platform)}`}>
            {course.platform}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">{course.level}</span>
            <span className="w-1 h-1 rounded-full bg-slate-700"></span>
            <Badge variant={course.cost_type === "free" ? "success" : "warning"} size="sm">
              {course.cost_type === "free" ? "Free" : `$${course.cost_amount || "Paid"}`}
            </Badge>
          </div>
        </div>

        {/* Title */}
        <h4 className="text-sm font-bold text-white leading-snug tracking-tight group-hover:text-indigo-400 transition-colors line-clamp-2 mb-3">
          {course.title}
        </h4>

        {/* Rating and Duration */}
        <div className="flex items-center gap-4 text-xs text-slate-400 mt-auto pt-3 border-t border-slate-800/50">
          <div className="flex items-center gap-1">
            <span className="font-bold text-amber-400 text-xs">{course.rating?.toFixed(1) || "4.5"}</span>
            <div className="flex items-center">{renderStars(course.rating || 4.5)}</div>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{course.duration_hours} hrs</span>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="bg-slate-950/40 p-4 border-t border-slate-800/60 flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSave}
          disabled={loading}
          className="p-2 shrink-0 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg flex items-center justify-center transition-all"
          title={isSaved ? "Saved" : "Save course"}
        >
          {isSaved ? (
            <BookmarkCheck className="w-4 h-4 text-emerald-400 animate-bounce" />
          ) : (
            <Bookmark className="w-4 h-4 text-slate-400" />
          )}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open(course.url || "https://google.com", "_blank")}
          className="flex-1 text-xs font-semibold py-2 hover:bg-indigo-600/10 hover:text-indigo-300 hover:border-indigo-500/30 flex items-center justify-center gap-1"
        >
          <span>Go to Course</span>
          <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-indigo-300" />
        </Button>
      </div>
    </Card>
  );
}

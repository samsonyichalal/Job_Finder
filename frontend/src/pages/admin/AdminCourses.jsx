import React, { useEffect, useState } from "react";
import careerService from "../../services/careerService";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    platform: "",
    url: "",
    skill_tags_json: "",
    duration_hours: "",
    cost_type: "free",
    cost_amount: "0",
    level: "beginner",
    rating: "4.5",
  });

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const load = async () => {
    const data = await careerService.getAdminCourses();
    setCourses(data || []);
  };

  useEffect(() => {
    load();
  }, []);

  const create = async (e) => {
    e.preventDefault();
    await careerService.createAdminCourse({
      ...form,
      skill_tags_json: form.skill_tags_json.split(",").map((s) => s.trim()).filter(Boolean),
      duration_hours: Number(form.duration_hours || 0),
      cost_amount: Number(form.cost_amount || 0),
      rating: Number(form.rating || 0),
    });
    setForm({
      title: "",
      platform: "",
      url: "",
      skill_tags_json: "",
      duration_hours: "",
      cost_type: "free",
      cost_amount: "0",
      level: "beginner",
      rating: "4.5",
    });
    await load();
  };

  const remove = async (courseId) => {
    await careerService.deleteAdminCourse(courseId);
    setCourses((prev) => prev.filter((course) => course.id !== courseId));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black text-white tracking-tight">Manage Courses</h1>

      <Card className="p-5">
        <form className="space-y-3" onSubmit={create}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input label="Title" value={form.title} onChange={(e) => set("title", e.target.value)} />
            <Input label="Platform" value={form.platform} onChange={(e) => set("platform", e.target.value)} />
            <Input label="URL" value={form.url} onChange={(e) => set("url", e.target.value)} />
            <Input label="Skills (comma separated)" value={form.skill_tags_json} onChange={(e) => set("skill_tags_json", e.target.value)} />
            <Input label="Duration Hours" type="number" value={form.duration_hours} onChange={(e) => set("duration_hours", e.target.value)} />
            <Input label="Cost Type" value={form.cost_type} onChange={(e) => set("cost_type", e.target.value)} />
            <Input label="Cost Amount" type="number" value={form.cost_amount} onChange={(e) => set("cost_amount", e.target.value)} />
            <Input label="Level" value={form.level} onChange={(e) => set("level", e.target.value)} />
            <Input label="Rating" type="number" value={form.rating} onChange={(e) => set("rating", e.target.value)} />
          </div>
          <Button type="submit" variant="primary">Create Course</Button>
        </form>
      </Card>

      <div className="space-y-3">
        {courses.map((course) => (
          <Card key={course.id} className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <p className="text-white font-semibold">{course.title}</p>
              <p className="text-xs text-muted">{course.platform} · {course.level}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => remove(course.id)} className="text-rose-300">
              Delete
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
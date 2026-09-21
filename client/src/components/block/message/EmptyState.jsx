const EmptyState = ({ icon: Icon, title, content }) => {
  return (
    <div className="py-12 text-center border-2 border-dashed border-slate-200 rounded-xl space-y-2 bg-slate-50/50">
      <Icon size={28} className="text-slate-300 mx-auto" />
      <p className="text-xs font-semibold text-slate-600">{title}</p>
      <p className="text-[11px] text-slate-400 max-w-sm mx-auto">{content}</p>
    </div>
  );
};

export default EmptyState;

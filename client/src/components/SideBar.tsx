type SidebarProps = {
  isOpen: boolean;
};

export default function Sidebar({ isOpen }: SidebarProps) {
  return (
    <aside className={isOpen ? 'w-64' : 'w-16'}>
      {/* ... */}
    </aside>
  );
}
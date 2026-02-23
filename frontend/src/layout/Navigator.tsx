import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (!element) return;

  const yOffset = -90;
  const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

  window.scrollTo({ top: y, behavior: "smooth" });
};

export default function Navigator() {
  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        sx: { width: 256, bgcolor: "#1c1c1c", color: "#fff" },
      }}
    >
      <List>
        <ListItemText primary="MENIU" sx={{ p: 2, color: "#d32f2f" }} />

        {[
          { label: "ACASĂ", id: "acasa" },
          { label: "SERVICII", id: "servicii" },
          { label: "DESPRE NOI", id: "despre" },
          { label: "RECENZII", id: "recenzii" },
          { label: "CONTACT", id: "contact" },
        ].map((item) => (
          <ListItemButton key={item.id} onClick={() => scrollToSection(item.id)}>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Link from "next/link";

export default function Home() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} display="flex" justifyContent="center">
          <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
            <Link href="/campus/wilf" passHref>
              <Button
                variant="contained"
                sx={{
                  borderRadius: 50, // Oval shape
                  fontSize: "2.75rem",
                  padding: "12px 30px",
                }}
              >
                Wilf
              </Button>
            </Link>
            <Link href="/campus/stern" passHref>
              <Button
                variant="contained"
                sx={{
                  borderRadius: 50, // Oval shape
                  fontSize: "2.75rem",
                  padding: "12px 30px",
                }}
              >
                Stern
              </Button>
            </Link>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

# ╔══════════════════════════════════════════════════════════════════════╗
# ║     Bitraxx BRX Launchpad — Pre-Launch Verification Script          ║
# ║     Usage: .\scripts\pre-launch-check.ps1                           ║
# ╚══════════════════════════════════════════════════════════════════════╝

$ErrorActionPreference = "Continue"
$pass = 0
$fail = 0

function Check-Pass($label) {
  Write-Host "  [PASS] $label" -ForegroundColor Green
  $global:pass++
}

function Check-Fail($label, $detail = "") {
  Write-Host "  [FAIL] $label" -ForegroundColor Red
  if ($detail) { Write-Host "         $detail" -ForegroundColor DarkRed }
  $global:fail++
}

Write-Host ""
Write-Host "══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  Bitraxx BRX Launchpad — Pre-Launch Verification" -ForegroundColor Cyan
Write-Host "══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# ── SECTION 1: Environment Variables ──────────────────────────────────────
Write-Host "[ 1/5 ] Checking Environment Variables..." -ForegroundColor Yellow

$required_vars = @(
  "DATABASE_URL",
  "SESSION_SECRET",
  "NEXT_PUBLIC_WAGMI_PROJECT_ID",
  "NODE_ENV"
)

foreach ($var in $required_vars) {
  $val = [System.Environment]::GetEnvironmentVariable($var)
  if (-not $val -or $val -eq "") {
    Check-Fail "ENV: $var" "Variable is missing or empty"
  } else {
    Check-Pass "ENV: $var is set"
  }
}

# SESSION_SECRET length check
$secret = [System.Environment]::GetEnvironmentVariable("SESSION_SECRET")
if ($secret -and $secret.Length -lt 32) {
  Check-Fail "SESSION_SECRET must be at least 32 characters (currently $($secret.Length))"
} elseif ($secret) {
  Check-Pass "SESSION_SECRET length OK ($($secret.Length) chars)"
}

Write-Host ""

# ── SECTION 2: TypeScript Compilation ─────────────────────────────────────
Write-Host "[ 2/5 ] Running TypeScript check..." -ForegroundColor Yellow
$tscOutput = pnpm check 2>&1
if ($LASTEXITCODE -eq 0) {
  Check-Pass "TypeScript compiles cleanly"
} else {
  Check-Fail "TypeScript errors found" ($tscOutput | Select-String "error TS" | Select-Object -First 5 | Out-String)
}

Write-Host ""

# ── SECTION 3: Unit Tests ──────────────────────────────────────────────────
Write-Host "[ 3/5 ] Running unit tests..." -ForegroundColor Yellow
$testOutput = pnpm test --run 2>&1
if ($LASTEXITCODE -eq 0) {
  Check-Pass "All unit tests passing"
} else {
  Check-Fail "Unit tests failed" ($testOutput | Select-String "FAIL|Error" | Select-Object -First 5 | Out-String)
}

Write-Host ""

# ── SECTION 4: Production Build ────────────────────────────────────────────
Write-Host "[ 4/5 ] Running production build..." -ForegroundColor Yellow
$buildOutput = pnpm build 2>&1
if ($LASTEXITCODE -eq 0) {
  Check-Pass "Production build succeeded"
} else {
  Check-Fail "Production build failed" ($buildOutput | Select-String "Error|error" | Select-Object -First 5 | Out-String)
}

Write-Host ""

# ── SECTION 5: Critical Files ──────────────────────────────────────────────
Write-Host "[ 5/5 ] Checking critical files..." -ForegroundColor Yellow

$critical_files = @(
  "app\api\trpc\[trpc]\route.ts",
  "app\api\auth\nonce\route.ts",
  "app\api\auth\verify\route.ts",
  "app\api\auth\logout\route.ts",
  "app\api\health\route.ts",
  "lib\session.ts",
  "lib\db.ts",
  "drizzle\schema.ts",
  "server\seed.ts",
  "vercel.json"
)

foreach ($file in $critical_files) {
  if (Test-Path $file) {
    Check-Pass "File exists: $file"
  } else {
    Check-Fail "Missing file: $file"
  }
}

# ── SUMMARY ───────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "══════════════════════════════════════════════════════════" -ForegroundColor Cyan
if ($fail -eq 0) {
  Write-Host "  RESULT: ALL CHECKS PASSED ($pass/$($pass+$fail)) — READY TO DEPLOY 🚀" -ForegroundColor Green
} else {
  Write-Host "  RESULT: $fail CHECKS FAILED / $pass PASSED — FIX BEFORE DEPLOYING ❌" -ForegroundColor Red
}
Write-Host "══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

if ($fail -gt 0) { exit 1 }

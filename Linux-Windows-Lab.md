**BSC3PR10A Final Practical Exam** 

* ⏱ **Duration: 1 Hour**
* 🧑‍💻 Updated text: *“You are a Linux System Administrator at MIT-WPU Lab”*
* 📘 Ready for upload to Google Classroom or print as a practical paper

---

# 🧾 **Final Practical Exam: Linux & Windows Administration (Comprehensive Assessment)**

**Course Code:** BSC3PR10A
**Subject:** Linux & Windows Administrator Lab
**Duration:** 1 Hour
**Total Marks:** 100
**Exam Type:** Live Practical (Server / VM Access Required)

**Submission Format:**

* **PDF Report:** Commands, steps, outputs, explanations, screenshots
* **Script File:** `.sh` or `.ps1` file with comments

---

## 🧩 **SECTION A — LINUX ADMINISTRATION (50 Marks)**

### 🧠 Scenario: *“Automate Server Setup & Network Health Check”*

**Objective:**
You are a **Linux System Administrator at MIT-WPU Lab**. Your instructor has asked you to configure a new Linux server, create users and groups, manage services, analyze system performance, and automate a scheduled backup script.

---

### **Tasks (Perform All)**

1. **User & File Setup (10 Marks)**

   * Create two users: `devuser` and `opsuser`
   * Create a group `adminteam` and add both users to it
   * Create a directory `/backup/reports`
   * Assign ownership to `adminteam` with read/write/execute permissions only for the group
   * Verify using `ls -l` and `groups`

2. **Process & Service Management (10 Marks)**

   * Install, start, and enable the `httpd` service
   * Create `/var/www/html/index.html` with the message:
     **“Welcome to Linux Lab”**
   * Verify service and port 80 status using:

     ```bash
     systemctl status httpd
     ss -tuln | grep 80
     ```

3. **Network Configuration & Testing (10 Marks)**

   * Configure or simulate a **static IP** using `nmcli`
   * Use `ping`, `traceroute`, and `ss` or `netstat` to test connectivity
   * Redirect all results to `/home/devuser/network_check.log`

4. **System Resource Report (10 Marks)**

   * Collect CPU, Memory, and Disk stats using `top`, `df -h`, and `du -sh /home`
   * Combine and store all outputs into `/var/log/sysreport.txt` using `tee`

5. **Automation Script (10 Marks)**

   * Write a shell script `/home/opsuser/auto_backup.sh` that:

     * Compresses `/backup/reports` into `/home/opsuser/reports_YYYYMMDD.tar.gz`
     * Logs the result in `/var/log/backup.log` with timestamps
     * Makes the script executable and test it manually

📄 **Submission:**

* `Linux_Final.pdf` (commands + screenshots + explanation)
* `auto_backup.sh` (script file)

---

# 🔘 **OR**

---

## 🪟 **SECTION B — WINDOWS ADMINISTRATION (50 Marks)**

### 🧠 Scenario: *“Configure, Secure & Automate System Tasks”*

**Objective:**
As a Windows Administrator at *Cloudnautic IT Labs*, you are tasked to configure users, monitor services, secure network ports, and automate daily maintenance operations using PowerShell.

---

### **Tasks (Perform All)**

1. **User & Group Management (10 Marks)**

   * Create two users: `webuser` and `dbuser`
   * Create a group `TechTeam` and add both users
   * Verify with PowerShell:

     ```powershell
     Get-LocalUser
     Get-LocalGroupMember -Group "TechTeam"
     ```

2. **Service Monitoring (10 Marks)**

   * Check, stop, and restart the `WSearch` service
   * Display the `Spooler` service status
   * Capture screenshots of **Task Manager** showing system utilization

3. **Networking & Firewall (10 Marks)**

   * Display IP configuration using:

     ```powershell
     ipconfig /all
     Get-NetIPConfiguration
     ```
   * Block outbound connections on port 80 using Windows Firewall
   * Verify the rule using `Get-NetFirewallRule`

4. **System Audit Report (10 Marks)**

   * Create a directory `C:\SystemAudit`
   * List all `.log` files in `C:\Windows` recursively and save the report:

     ```powershell
     Get-ChildItem -Path C:\Windows -Filter *.log -Recurse | Out-File C:\SystemAudit\logs_report.txt
     ```

5. **Automation Script (10 Marks)**

   * Create a PowerShell script `C:\Scripts\maintenance.ps1` that:

     * Creates folder `C:\BackupLogs` if it doesn’t exist
     * Copies `logs_report.txt` to `C:\BackupLogs` with the current date suffix
     * Appends “Backup completed successfully at <timestamp>” to `C:\BackupLogs\status.log`
   * Execute the script and provide output screenshots

📄 **Submission:**

* `Windows_Final.pdf` (commands + screenshots + explanation)
* `maintenance.ps1` (script file)

---

## 🏁 **Grading Rubric (Same for Both Options)**

| Criteria                           | Weightage |
| ---------------------------------- | --------- |
| ✅ Command Accuracy & Syntax        | 25%       |
| 🧩 Output Validity & Functionality | 25%       |
| ⚙️ Scripting & Automation          | 20%       |
| 🧠 Conceptual Understanding        | 20%       |
| 🗂️ Report Presentation            | 10%       |

---


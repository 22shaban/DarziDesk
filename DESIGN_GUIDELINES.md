# 🧵 DarziDesk Design Guidelines (v1.0)

> **Status:** Frozen
>
> This document defines the official UI/UX specification for DarziDesk.
> Every future page, component, and feature must follow these guidelines.
> Do not introduce new layouts, colors, or components unless explicitly approved.

---

# Application

**Name**

DarziDesk

**Subtitle**

Tailor Shop Management System

**Target Users**

Owner-only desktop application for men's tailoring shops.

**Supported Devices**

Desktop only.

Responsive/mobile layouts are not required.

---

# Design Philosophy

DarziDesk should feel like a premium commercial SaaS application built specifically for tailoring businesses.

Design inspiration:

- Luxury Boutique
- Modern SaaS
- Apple-inspired simplicity

The interface should look elegant, clean, and professional rather than overly colorful or enterprise-heavy.

---

# Color Palette

Primary

Navy Blue

Secondary

Gold

Background

White

Cards

White with subtle shadow

Sidebar

Dark Navy

Success

Green

Warning

Orange

Danger

Red

Information

Blue

---

# Branding

Application Name

🧵 DarziDesk

Subtitle

Tailor Shop Management System

Footer

🧵 DarziDesk v1.0

Made with ❤️ for Tailors

Powered by AWS

---

# Layout

Desktop Only

### Sidebar

Position

Left

Behavior

Collapsible

Expanded Width

260px

Collapsed Width

80px

When collapsed

- Icons only
- Tooltip on hover
- More workspace for tables

Sidebar Items

🏠 Dashboard

📦 Orders

👥 Customers

📏 Measurements

🧵 Fabric & Inventory

👨‍💼 Employees

🧾 Invoices

📊 Reports

⚙️ Settings

---

# Top Navigation

Left

🔍 Global Search

Right

🔔 Notifications

➕ New Order

🏪 Shop Name ▼

Example

Royal Men's Tailor ▼

Dropdown

Store Profile

Change Password

Logout

---

# Dashboard

## KPI Cards

1. Active Orders

2. Monthly Revenue

3. Inventory Value

4. Low Stock Items

---

## Charts

Revenue Overview

Order Status

---

## Recent Orders

Shows latest customer orders.

---

## Recent Activity

Examples

✔ Order #142 marked Ready

✔ New Customer Added

✔ Invoice Generated

✔ Inventory Updated

✔ Employee Assigned

---

## Ready for Pickup

No delivery scheduling.

No pickup time.

Only show

Customer Name

Garment

Example

Ahmed Khan

Suit

---

# Orders

Fields

Customer

Garment Type

Fabric Source

Measurements

Assigned Tailor

Delivery Date

Advance Payment

Remaining Amount

Status

Workflow

New

↓

Measurements

↓

Cutting

↓

Stitching

↓

Quality Check

↓

Ready

↓

Delivered

When status changes to Ready

↓

Amazon SES sends Email notification

---

# Customers

Customer Details

Measurements

Customer Preferences

Customer History

No customer login.

---

# Measurements

Supported Garments

- Shirt
- Suit
- Blazer
- Kurta
- Sherwani

---

# Fabric & Inventory

Tracks

Fabric Name

Color

Quantity

Inventory Value

Low Stock

Business Rule

Customer Fabric

↓

Inventory unchanged

Shop Fabric

↓

Inventory decreases

---

# Employees

Fields

Name

Phone

Role

Salary

Status

Assigned Orders

No Attendance

No Payroll

---

# Invoices

Simple printable invoice

Customer

Order

Advance

Remaining

Total

---

# Reports

Revenue

Inventory

Orders

Employee Performance

---

# Settings

Store Profile

Users & Roles

Notifications

Backup & Restore

AWS Integration

---

# Store Profile

Owner configures

Shop Logo

Shop Name

Owner Name

Phone

Email (Optional)

Address

After saving

The Shop Name appears automatically on

Dashboard

Invoices

Reports

Email Notifications

Top Navigation

---

# Logo

Official logo location

frontend/src/assets/logo/

Files

darzidesk-logo.png

favicon.png

SVG can replace PNG later.

---

# Icons

Use consistent modern outline icons.

Avoid mixing icon libraries.

---

# Card Design

Rounded corners

Subtle shadows

Consistent spacing

Minimal borders

Premium appearance

---

# Typography

Professional

Easy to read

Consistent hierarchy

No decorative fonts except logo.

---

# Spacing

Generous whitespace.

Avoid clutter.

Maintain consistent margins and padding across all pages.

---

# UI Rules

DO

✅ Keep layout consistent

✅ Keep components reusable

✅ Use navy & gold branding

✅ Keep dashboard clean

✅ Use color-coded status badges

DON'T

❌ Add unnecessary widgets

❌ Add weather

❌ Add appointments

❌ Add customer portal

❌ Add payment gateway

❌ Add GST calculations

❌ Add enterprise ERP features

❌ Add delivery tracking

---

# AWS Branding

Footer

Powered by AWS

The application should subtly showcase AWS without overwhelming the UI.

---

# Final Rule

If a future design or generated code conflicts with this document,

THIS DOCUMENT TAKES PRIORITY.
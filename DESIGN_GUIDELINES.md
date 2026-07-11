# 🧵 DarziDesk Design Guidelines (v1.0)

> **Status:** Frozen
>
> This document defines the official UI/UX specification for DarziDesk.
> Every future page, component, and feature must follow these guidelines.
> Do not introduce new layouts, colors, components, or workflows unless explicitly approved.

---

# Version Information

**Application**

DarziDesk

**Version**

v1.0

**Status**

Frozen

**Last Updated**

July 2026

---

# Application

## Name

🧵 DarziDesk

## Subtitle

Tailor Shop Management System

## Target Users

Owner-only desktop application for small men's tailoring businesses.

No customer portal.

No employee portal.

## Supported Devices

Desktop only.

Minimum resolution: **1366 × 768**

Mobile and tablet layouts are NOT required.

---

# Design Philosophy

DarziDesk should feel like a premium commercial SaaS application built specifically for tailoring businesses.

Design inspiration:

- Luxury Boutique
- Modern SaaS
- Apple-inspired simplicity

The interface should be elegant, minimal, modern, and professional.

Avoid an enterprise ERP appearance.

---

# Color Palette

## Primary

Navy Blue

Hex:

#0F2744

---

## Secondary

Gold

Hex:

#C9A227

---

## Background

Light Warm White

Hex:

#F8F6F2

---

## Cards

White

Hex:

#FFFFFF

Soft shadow

Rounded corners

---

## Status Colors

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

## Application Name

🧵 DarziDesk

## Subtitle

Tailor Shop Management System

---

# Footer

🧵 DarziDesk v1.0

Made with ❤️ for Tailors

Powered by AWS

---

# Layout

Desktop only.

---

## Sidebar

Position

Left

Behavior

Collapsible

Expanded Width

260px

Collapsed Width

80px

Collapsed Mode

• Icons only

• Tooltip on hover

• More workspace for tables

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

Dashboard remains highlighted when active.

---

# Top Navigation

## Left

☰ Sidebar Toggle

Dashboard Title

---

## Right

🔔 Notifications

➕ Quick Actions

🏪 Shop Name ▼

Example

Royal Men's Tailor ▼

Dropdown Items

Store Profile

Change Password

Logout

---

## Quick Actions Menu

Contains only

+ New Order

+ Add Customer

---

# Dashboard

## KPI Cards

Active Orders

Monthly Revenue

Inventory Value

Low Stock Items

---

## Recent Activity

Shows latest activities.

Examples

✔ Order #142 marked Ready

✔ New Customer Added

✔ Invoice Generated

✔ Inventory Updated

✔ Employee Assigned

---

## Ready for Pickup

Purpose

Shows garments ready for customer pickup.

Do NOT display pickup time.

Display ONLY

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

---

## Order Workflow

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

Picked Up

---

## Notification Rule

When Order Status changes to

Ready

↓

Amazon SES automatically sends an Email notification to the customer.

SMS using Amazon SNS may be added later as an optional feature.

---

# Customers

Contains

Customer Details

Measurements

Customer Preferences

Customer History

No customer login.

---

# Measurements

Supported Garments

• Shirt

• Suit

• Blazer

• Kurta

• Sherwani

Measurements should remain reusable for future orders.

---

# Fabric & Inventory

Tracks

Fabric Name

Color

Quantity

Inventory Value

Low Stock

---

## Business Rule

Customer provides fabric

↓

Inventory remains unchanged

Shop provides fabric

↓

Inventory quantity decreases

---

# Employees

Fields

Name

Phone

Role

Salary

Status

Assigned Orders

Not Included

❌ Attendance

❌ Payroll

❌ Shift Management

---

# Invoices

Simple printable invoice.

Contains

Customer

Order

Advance Paid

Remaining Amount

Total

---

# Reports

Revenue

Inventory

Orders

Employee Performance

No complex analytics.

No BI dashboards.

---

# Settings

Store Profile

Users & Roles

Notifications

Backup & Restore

AWS Integration

No additional settings pages.

---

# Store Profile

Configured during first login or later from Settings.

Fields

Shop Logo

Shop Name

Owner Name

Phone Number

Email (Optional)

Address

After saving,

Shop Name automatically appears in

Dashboard

Invoices

Reports

Email Notifications

Top Navigation

---

# Logo

Official Location

frontend/public/logo/

Files

darzidesk-logo.png

darzidesk-logo.svg

favicon.ico

---

# Icons

Use one icon library only.

Preferred

React Icons

Use modern outline icons.

---

# Card Design

Rounded Corners

Soft Shadow

Consistent Padding

Minimal Borders

Premium Appearance

Equal Heights

---

# Typography

Professional

Readable

Consistent hierarchy

No decorative fonts except the logo.

---

# Spacing

Generous whitespace.

Consistent padding.

Consistent margins.

Avoid clutter.

---

# UI Rules

## DO

✅ Keep layout consistent

✅ Keep reusable components

✅ Use Navy & Gold branding

✅ Keep dashboard clean

✅ Use color-coded status badges

✅ Follow Bootstrap 5 spacing

---

## DON'T

❌ Add Weather Widget

❌ Add Appointments

❌ Add Customer Portal

❌ Add Payment Gateway

❌ Add GST Calculations

❌ Add ERP Features

❌ Add Delivery Tracking

❌ Add Random Dashboard Widgets

❌ Change the navigation structure

---

# AWS Branding

Footer only

Powered by AWS

AWS branding should remain subtle and professional.

---

# Technology Rules

Frontend

React + Vite

Bootstrap 5

React Router

Axios

React Icons

Backend

Flask

REST API

Boto3

Database

Amazon DynamoDB

---

# Development Rules

Desktop-first only.

Component-based architecture.

Reusable React components.

Separate UI from business logic.

No inline styles unless absolutely necessary.

No hardcoded production data.

No duplicate components.

Keep code modular and scalable.

---

# GitHub Copilot Rule

GitHub Copilot must follow this document when generating UI components or layouts.

If generated code conflicts with this specification,

THIS DOCUMENT ALWAYS TAKES PRIORITY.

---

# Final Rule

This document is considered **Frozen**.

Any future UI or UX changes require explicit approval before implementation.

No additional pages, widgets, colors, layouts, or workflows should be introduced without updating this document.
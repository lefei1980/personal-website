#!/bin/bash

# Quick CMS Testing Script
# This script helps you quickly test the Decap CMS locally

echo "🚀 Starting Decap CMS Local Testing..."
echo ""
echo "This will start two processes:"
echo "  1. Decap CMS local backend proxy (port 8081)"
echo "  2. Next.js development server (port 3000)"
echo ""

# Check if both terminals can be opened
if command -v gnome-terminal &> /dev/null; then
    echo "Opening terminals..."
    gnome-terminal -- bash -c "npx decap-server; exec bash"
    sleep 2
    gnome-terminal -- bash -c "npm run dev; exec bash"
elif command -v osascript &> /dev/null; then
    # macOS
    osascript -e 'tell app "Terminal" to do script "cd \"'$(pwd)'\" && npx decap-server"'
    sleep 2
    osascript -e 'tell app "Terminal" to do script "cd \"'$(pwd)'\" && npm run dev"'
else
    echo "⚠️  Unable to auto-open terminals on this system."
    echo ""
    echo "Please manually run these commands in two separate terminals:"
    echo ""
    echo "Terminal 1:"
    echo "  npx decap-server"
    echo ""
    echo "Terminal 2:"
    echo "  npm run dev"
    echo ""
fi

echo ""
echo "✅ Once both servers are running:"
echo "   → Open http://localhost:3000/admin in your browser"
echo "   → Click 'Login' (no password needed in local mode)"
echo "   → Start creating/editing content!"
echo ""
echo "📖 For detailed testing checklist, see PHASE4_SETUP.md"
echo ""

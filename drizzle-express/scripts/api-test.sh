#!/bin/bash

# Simple API Integration Test for Posts Resource
# Tests CRUD operations on http://localhost:3000/posts

BASE_URL="http://localhost:3000/posts"

echo "=== Testing Posts API ==="

# Test 1: GET all posts
echo "1. GET /posts"
curl -s "$BASE_URL" | jq '.'
echo

# Test 2: CREATE a post
echo "2. POST /posts (Create)"
POST_RESPONSE=$(curl -s -X POST \
  -H "Content-Type: application/json" \
  -d '{"title": "Test Post", "content": "Test content", "likes": 1, "publishedAt": "2025-08-03", "categoryId": null}' \
  "$BASE_URL")

echo "$POST_RESPONSE"

echo

GET_RESPONSE=$(curl -s "$BASE_URL" | jq '.')
echo "$GET_RESPONSE"
POST_ID=$(echo "$GET_RESPONSE" | jq -r '.[0].id')
echo


# Test 3: GET specific post
echo "3. GET /posts/$POST_ID"
curl -s "$BASE_URL/$POST_ID" | jq '.'
echo

# Test 4: UPDATE post
echo "4. PUT /posts/$POST_ID (Update)"
curl -s -X PUT \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Post", "content": "Updated content", "likes": 2, "publishedAt": "2025-8-3"}' \
echo

# Test 5: PATCH post
echo "5. PATCH /posts/$POST_ID (Partial Update)"
curl -s -X PATCH \
  -H "Content-Type: application/json" \
  -d '{"title": "Patched Post"}' \
echo

# Test 6: DELETE post
echo "6. DELETE /posts/$POST_ID"
curl -s -X DELETE "$BASE_URL/$POST_ID"
echo "Post deleted"
echo

# Test 7: Verify deletion (should return 404)
echo "7. GET /posts/$POST_ID (should be 404)"
curl -s -w "HTTP Status: %{http_code}\n" "$BASE_URL/$POST_ID"
echo

echo "=== Tests Complete ==="

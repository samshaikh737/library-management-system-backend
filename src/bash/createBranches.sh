#!/bin/bash

API_URL="http://localhost/api/v1/branches"
BRANCHES=(
    '{"name": "Central Library", "address": "123 Library Lane", "city": "Booktown", "state": "CA", "zipCode": "90210", "phone": "123-456-7890"}'
    '{"name": "Westside Branch", "address": "456 Westside Ave", "city": "Booktown", "state": "CA", "zipCode": "90211", "phone": "123-456-7891"}'
    '{"name": "Eastside Branch", "address": "789 Eastside Blvd", "city": "Booktown", "state": "CA", "zipCode": "90212", "phone": "123-456-7892"}'
    '{"name": "North Branch", "address": "101 North St", "city": "Booktown", "state": "CA", "zipCode": "90213", "phone": "123-456-7893"}'
    '{"name": "South Branch", "address": "202 South St", "city": "Booktown", "state": "CA", "zipCode": "90214", "phone": "123-456-7894"}'
    '{"name": "Downtown Branch", "address": "303 Downtown Ave", "city": "Booktown", "state": "CA", "zipCode": "90215", "phone": "123-456-7895"}'
    '{"name": "Uptown Branch", "address": "404 Uptown Blvd", "city": "Booktown", "state": "CA", "zipCode": "90216", "phone": "123-456-7896"}'
    '{"name": "Main Branch", "address": "505 Main St", "city": "Booktown", "state": "CA", "zipCode": "90217", "phone": "123-456-7897"}'
    '{"name": "Liberty Branch", "address": "606 Liberty Rd", "city": "Booktown", "state": "CA", "zipCode": "90218", "phone": "123-456-7898"}'
    '{"name": "Park Branch", "address": "707 Park Ln", "city": "Booktown", "state": "CA", "zipCode": "90219", "phone": "123-456-7899"}'
)

for BRANCH in "${BRANCHES[@]}"; do
    curl -X POST $API_URL -H "Content-Type: application/json" -d "$BRANCH"
done

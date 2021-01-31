# function to convert given hexadecimal Value
# to an integer (decimal number)
def HexToDec(value):
  try:
    return int(value, 16)
  except ValueError:
    return "Invalid Hexadecimal Value"

# Main code
input1 = "4c"
input2 = "af"
input3 = "50"

print(input1, "as decimal: ", HexToDec(input1))
print(input2, "as decimal: ", HexToDec(input2))
print(input3, "as decimal: ", HexToDec(input3))

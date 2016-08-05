import random

U_output_nominal = random.choice([4, 5, 6, 7, 8, 9])
f_input = random.choice([50, 75, 10, 150, 200, 250, 300])
R_load = random.choice([1.0, 2.0, 3.0, 4.0, 4.3, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1])
K = random.choice([5, 6, 7, 8, 9, 10])
E24 = [1.0, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2.0, 2.2, 2.4, 2.7, 3.0, 3.3, 3.6, 3.9, 4.3, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1]


def get_standard_value(value, array=E24):
    for item in array:
        if item < value:
            end_value = array.index(item) + 1
        else:
            try:
                return array[end_value]
            except:
                return array[0]

U_stabilization = get_standard_value(U_output_nominal, E24)

I_n = U_output_nominal / R_load
R_additional = U_stabilization - U_output_nominal / I_n
R_additional_E24 = get_standard_value(R_additional, E24)
P_additional = I_n * I_n * R_additional_E24
U_0 =1.4 * U_stabilization


def I_stabilization_check(exp, ans):
    min_value = 3 * I_n
    max_value = 5 * I_n
    if ans < max_value and ans > min_value:
        I_stabilization = ans
        R_nominal = ( U_0 - U_stabilization ) / ( I_stabilization - I_n )
        R_nominal_E24 = get_standard_value(R_nominal, E24)
        P_nominal = ( I_stabilization - I_n ) * ( I_stabilization - I_n ) * R_nominal_E24
        C_filter = ( I_stabilization - I_n ) * 100 / ( K * U_0 * f_input)
        U_output = U_0 + 0.5
        return True
    else:
        return False

def test(U_output_nominal, f_input, R_load, K):
    U_stabilization = get_standard_value(U_output_nominal, E24)

    I_n = U_output_nominal / R_load
    R_additional = U_stabilization - U_output_nominal / I_n
    R_additional_E24 = get_standard_value(R_additional, E24)
    P_additional = I_n * I_n * R_additional_E24
    U_0 =1.4 * U_stabilization

    return U_stabilization, I_n, R_additional, R_additional_E24, P_additional, U_0

print(test(4, 250, 6.8, 6))
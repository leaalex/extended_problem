# -*- coding: utf-8 -*-
import random
import math
import matplotlib.pyplot as plt
import numpy as np

V_k = 200
V_pip = 10
t_3_95 = 4.3
Mz_KMnO4 = 31.6
Mz_NH4VO3 = 116.94

C = round(random.randint(900, 1500)*0.0001, 4)


def generate_data():
    experiment_len = random.randint(22, 25)
    v_tmp = [round(x*0.1, 1) for x in list(range(0, experiment_len*10))]
    v_func = []
    for f in range(experiment_len):
        v_func.append(random.choice(v_tmp[f*10:f*10+10]))

    interval_1 = round(experiment_len/3) + random.choice([0, 1, ])
    interval_3 = round(experiment_len/3) + random.choice([-2, -1, 0, ])
    interval_2 = experiment_len - interval_1 - interval_3
    # print(interval_1, interval_2, interval_3, sum([interval_1, interval_2, interval_3]))

    interval_2_value_max = random.choice([0.2, 0.3])
    interval_1_incline = random.randint(5, 100) * 0.01  # наклон левой ветви: от 0.05 до 1.5
    interval_3_incline = random.randint(50, 250) * 0.01  # наклон правой ветви: от 0.05 до 1.5

    interval_1_values = [round(math.sqrt(interval_1_incline*(-x + list(reversed(v_func[:interval_1]))[0])) + interval_2_value_max, 2) for x in list(reversed(v_func[:interval_1]))]
    interval_1_values = list(reversed(interval_1_values))
    interval_3_values = [round(math.sqrt(interval_3_incline*(x - v_func[-interval_3:][0])) + interval_2_value_max,
                               2) for x in v_func[-interval_3:]]
    interval_2_value = round(interval_2_value_max - random.choice([0.1, 0.2, ]), 1)
    i_func = interval_1_values + [interval_2_value for x in list(range(0, interval_2))] + interval_3_values
    index_1 = random.choice([interval_1-1, interval_1, interval_1+1])
    index_2 = random.choice([experiment_len-interval_3-1, experiment_len-interval_3, ])
    return v_func, i_func, index_1, index_2


V_1, I_1, V_1_ind_1, V_1_ind_2 = generate_data()
V_2, I_2, V_2_ind_1, V_2_ind_2 = generate_data()
V_3, I_3, V_3_ind_1, V_3_ind_2 = generate_data()

V_1 = [0, 1, 2, 4, 6, 7, 7.5, 8.0, 8.5, 9.0, 11, 13, 17, 18, 19, 19.2, 19.4, 20, 21, 23]
I_1 = [1.7, 1.5, 1.3, 1.0, 0.7, 0.5, 0.3, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.8, 1.2, 2.6, 3.3, 4.3]
V_1_ind_1 = 7
V_1_ind_2 = 14
V_2 = [0, 2, 4, 6, 7, 7.5, 7.8, 8, 8.2, 8.5, 11, 14, 17, 18, 18.5, 18.8, 19, 19.2, 20, 22]
I_2 = [2, 1.8, 1.5, 1.2, 1, 0.7, 0.5, 0.4, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.5, 0.9, 1.6, 3.2]
V_2_ind_1 = 8
V_2_ind_2 = 15
V_3 = [0, 2, 4, 6, 7, 7.5, 7.8, 7.9, 8.5, 9, 12, 15, 18, 18.5, 18.8, 19.1, 19.2, 19.5, 20, 22]
I_3 = [2.5, 2, 1.8, 1.4, 1, 0.7, 0.3, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.3, 1.2, 1.8, 3.2]
V_3_ind_1 = 7
V_3_ind_2 = 15
C = 0.0925

V_1_1T = V_1[V_1_ind_1]
V_1_2T = V_1[V_1_ind_2]

V_2_1T = V_2[V_2_ind_1]
V_2_2T = V_2[V_2_ind_2]

V_3_1T = V_3[V_3_ind_1]
V_3_2T = V_3[V_3_ind_2]

m_KMnO4_1 = round(C * V_1_1T * Mz_KMnO4 * math.pow(10, -3) * (V_k/V_pip), 4)
m_NH4VO3_1 = round(C * (V_1_2T - V_1_1T) * Mz_NH4VO3 * math.pow(10, -3) * (V_k/V_pip), 4)

m_KMnO4_2 = round(C * V_2_1T * Mz_KMnO4 * math.pow(10, -3) * (V_k/V_pip), 4)
m_NH4VO3_2 = round(C * (V_2_2T - V_2_1T) * Mz_NH4VO3 * math.pow(10, -3) * (V_k/V_pip), 4)

m_KMnO4_3 = round(C * V_3_1T * Mz_KMnO4 * math.pow(10, -3) * (V_k/V_pip), 4)
m_NH4VO3_3 = round(C * (V_3_2T - V_3_1T) * Mz_NH4VO3 * math.pow(10, -3) * (V_k/V_pip), 4)

m_average_KMnO4 = round((m_KMnO4_1 + m_KMnO4_2 + m_KMnO4_3)/3, 4)
m_average_NH4VO3 = round((m_NH4VO3_1 + m_NH4VO3_2 + m_NH4VO3_3)/3, 4)

S_KMnO4 = round(np.std([m_KMnO4_1, m_KMnO4_2, m_KMnO4_3], ddof=1), 4)
S_NH4VO3 = round(np.std([m_NH4VO3_1, m_NH4VO3_2, m_NH4VO3_3], ddof=1), 4)

Sr_KMnO4 = round(S_KMnO4/m_average_KMnO4 * 100, 4)
Sr_NH4VO3 = round(S_NH4VO3/m_average_NH4VO3 * 100, 4)

delta_m_KMnO4 = round((S_KMnO4*t_3_95)/math.sqrt(3), 4)
delta_m_NH4VO3 = round((S_NH4VO3*t_3_95)/math.sqrt(3), 4)


print(V_1_1T, V_1_2T)
print(m_KMnO4_1, m_NH4VO3_1)
print("------------------------------------")
print(V_2_1T, V_2_2T)
print(m_KMnO4_2, m_NH4VO3_2)
print("------------------------------------")
print(V_3_1T, V_3_2T)
print(m_KMnO4_3, m_NH4VO3_3)
print("------------------------------------")
print(m_average_KMnO4, m_average_NH4VO3)
print("------------------------------------")
print(S_KMnO4, S_NH4VO3)
print("------------------------------------")
print(Sr_KMnO4, Sr_NH4VO3)
print("------------------------------------")
print(delta_m_KMnO4, delta_m_NH4VO3)
print("------------------------------------")

plt.plot(V_1, I_1, 'b' "o-")
plt.plot(V_1[V_1_ind_1], I_1[V_1_ind_1], 'k' "o-")
plt.plot(V_1[V_1_ind_2], I_1[V_1_ind_2], 'k' "o-")


plt.plot(V_2, I_2, 'b' "o-")
plt.plot(V_2[V_2_ind_1], I_2[V_2_ind_1], 'k' "o-")
plt.plot(V_2[V_2_ind_2], I_2[V_2_ind_2], 'k' "o-")

plt.plot(V_3, I_3, 'b' "o-")
plt.plot(V_3[V_3_ind_1], I_3[V_3_ind_1], 'k' "o-")
plt.plot(V_3[V_3_ind_2], I_3[V_3_ind_2], 'k' "o-")

plt.ylim([-1, 5])
plt.xlim([-1, 26])

plt.show()
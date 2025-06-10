import { useAuth } from "@/contexts/AuthContext";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  Modal,
  Pressable,
} from "react-native";
import { API_URL } from "@/utils/apiurl";

const UserManagementPanel = () => {
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({
    firstname: "",
    lastname: "",
    login: "",
    role: "department_worker",
    password: "",
  });
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/users`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch users:", response.status);
      }
      const data = await response.json();
      setUsers(
        data.map((user) => {
          const { hashed_pwd, ...rest } = user;
          return rest;
        })
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const updateUser = async (id, changes) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(changes),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch users:", response.status);
      }
      fetchUsers();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const deleteUserReq = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch users:", response.status);
      }
      fetchUsers();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user) {
      fetchUsers();
    }
  }, [user]);

  const [editingStates, setEditingStates] = useState({});

  const handleInputChange = (userId, field, value) => {
    setEditingStates((prev) => {
      const currentState = prev[userId] || {
        isEditing: false,
        tempData: users.find((u) => u.number === userId),
        hasChanges: false,
      };

      const newTempData = { ...currentState.tempData, [field]: value };

      // Check if any field has changed compared to original
      const originalUser = users.find((u) => u.number === userId);
      const hasChanges = Object.keys(newTempData).some((key) => {
        if (key === "password") return value !== ""; // New password field
        return originalUser[key] !== newTempData[key];
      });

      return {
        ...prev,
        [userId]: {
          ...currentState,
          tempData: newTempData,
          hasChanges,
        },
      };
    });
  };

  const startEditing = (userId) => {
    const user = users.find((u) => u.number === userId);
    setEditingStates((prev) => ({
      ...prev,
      [userId]: {
        isEditing: true,
        tempData: { ...user, password: "" }, // Initialize with empty password
        hasChanges: false,
      },
    }));
  };

  const saveChanges = (userId) => {
    const updatedUser = { ...editingStates[userId].tempData };

    // Only include password if it was changed
    if (updatedUser.password === "") {
      delete updatedUser.password;
    }
    updateUser(userId, updatedUser);

    setEditingStates((prev) => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        isEditing: false,
        hasChanges: false,
      },
    }));
  };

  const cancelChanges = (userId) => {
    setEditingStates((prev) => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        isEditing: false,
        hasChanges: false,
      },
    }));
  };

  const deleteUser = (userId) => {
    Alert.alert(
      "Подтверждение удаления",
      "Вы уверены, что хотите удалить этого пользователя?",
      [
        { text: "Отмена", style: "cancel" },
        {
          text: "Удалить",
          style: "destructive",
          onPress: () => {
            deleteUserReq(userId);
            setEditingStates((prev) => {
              const newState = { ...prev };
              delete newState[userId];
              return newState;
            });
          },
        },
      ]
    );
  };
  const createUser = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) {
        throw new Error("Failed to create user:", response.status);
      }
      setShowAddModal(false);
      setNewUser({
        firstname: "",
        lastname: "",
        login: "",
        role: "department_worker",
        password: "",
      });
      fetchUsers();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const handleNewUserChange = (field, value) => {
    setNewUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const renderAddUserModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showAddModal}
      onRequestClose={() => setShowAddModal(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Добавить нового пользователя</Text>

          <View style={styles.modalField}>
            <Text style={styles.fieldLabel}>Имя</Text>
            <TextInput
              style={styles.fieldInput}
              value={newUser.firstname}
              onChangeText={(text) => handleNewUserChange("firstname", text)}
              placeholder="Введите имя"
            />
          </View>

          <View style={styles.modalField}>
            <Text style={styles.fieldLabel}>Фамилия</Text>
            <TextInput
              style={styles.fieldInput}
              value={newUser.lastname}
              onChangeText={(text) => handleNewUserChange("lastname", text)}
              placeholder="Введите фамилию"
            />
          </View>

          <View style={styles.modalField}>
            <Text style={styles.fieldLabel}>Логин</Text>
            <TextInput
              style={styles.fieldInput}
              value={newUser.login}
              onChangeText={(text) => handleNewUserChange("login", text)}
              placeholder="Введите логин"
            />
          </View>

          <View style={styles.modalField}>
            <Text style={styles.fieldLabel}>Роль</Text>
            <TextInput
              style={styles.fieldInput}
              value={newUser.role}
              onChangeText={(text) => handleNewUserChange("role", text)}
              placeholder="Введите роль"
            />
          </View>

          <View style={styles.modalField}>
            <Text style={styles.fieldLabel}>Пароль</Text>
            <TextInput
              style={styles.fieldInput}
              value={newUser.password}
              onChangeText={(text) => handleNewUserChange("password", text)}
              placeholder="Введите пароль"
              secureTextEntry={true}
            />
          </View>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => setShowAddModal(false)}
            >
              <Text style={styles.buttonText}>Отмена</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={createUser}
              disabled={!newUser.login || !newUser.password}
            >
              <Text style={styles.buttonText}>Создать</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const renderUserRow = (user) => {
    const isEditing = editingStates[user.number]?.isEditing || false;
    const hasChanges = editingStates[user.number]?.hasChanges || false;
    const tempData = editingStates[user.number]?.tempData || user;

    return (
      <View key={user.number} style={styles.userContainer}>
        <View style={styles.userFieldsRow}>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Имя</Text>
            <TextInput
              style={styles.fieldInput}
              value={tempData.firstname}
              onChangeText={(text) =>
                handleInputChange(user.number, "firstname", text)
              }
              editable={isEditing}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Фамилия</Text>
            <TextInput
              style={styles.fieldInput}
              value={tempData.lastname}
              onChangeText={(text) =>
                handleInputChange(user.number, "lastname", text)
              }
              editable={isEditing}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Логин</Text>
            <TextInput
              style={styles.fieldInput}
              value={tempData.login}
              onChangeText={(text) =>
                handleInputChange(user.number, "login", text)
              }
              editable={isEditing}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Роль</Text>
            <TextInput
              style={styles.fieldInput}
              value={tempData.role}
              onChangeText={(text) =>
                handleInputChange(user.number, "role", text)
              }
              editable={isEditing}
            />
          </View>

          <View style={[styles.fieldContainer, { width: "100%" }]}>
            <Text style={styles.fieldLabel}>Новый пароль</Text>
            <TextInput
              style={styles.fieldInput}
              value={isEditing ? tempData.password || "" : "********"}
              onChangeText={(text) =>
                handleInputChange(user.number, "password", text)
              }
              editable={isEditing}
              secureTextEntry={true}
              placeholder={isEditing ? "Введите новый пароль" : ""}
            />
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          {!isEditing ? (
            <>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => startEditing(user.number)}
              >
                <Text style={styles.buttonText}>Редактировать</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteUser(user.number)}
              >
                <Text style={styles.buttonText}>Удалить</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={[
                  styles.saveButton,
                  !hasChanges && styles.disabledButton,
                ]}
                onPress={() => saveChanges(user.number)}
                disabled={!hasChanges}
              >
                <Text style={styles.buttonText}>Сохранить</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => cancelChanges(user.number)}
              >
                <Text style={styles.buttonText}>Отменить</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteUser(user.number)}
              >
                <Text style={styles.buttonText}>Удалить</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        users.map((user) => renderUserRow(user))
      )}
      {!loading && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddModal(true)}
        >
          <Text style={styles.addButtonText}>+ Добавить пользователя</Text>
        </TouchableOpacity>
      )}

      {renderAddUserModal()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "rgba(131, 131, 131, 0.4)",
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  userContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userFieldsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  fieldContainer: {
    width: "48%",
    marginBottom: 10,
  },
  fieldLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  fieldInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    paddingHorizontal: 10,
    fontSize: 14,
    backgroundColor: "#fff",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    flexWrap: "wrap",
  },
  editButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginLeft: 8,
  },
  saveButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginLeft: 8,
  },
  cancelButton: {
    backgroundColor: "#FF9800",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginLeft: 8,
  },
  deleteButton: {
    backgroundColor: "#F44336",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginLeft: 8,
  },
  disabledButton: {
    backgroundColor: "#9E9E9E",
    opacity: 0.6,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 6,
    marginBottom: 16,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "90%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  modalField: {
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },
});

export default UserManagementPanel;

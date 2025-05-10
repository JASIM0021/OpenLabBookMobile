import React, { useState, useEffect } from 'react';
import { Modal, View, StyleSheet, TextInput } from 'react-native';
import { Button, Text } from 'react-native-paper';

const ConfirmationModal = ({ visible, onClose, onConfirm, inputRef }) => {
  const [confirmText, setConfirmText] = useState('');
  const [holdStartTime, setHoldStartTime] = useState(null);

  useEffect(() => {
    if (visible) {
      setConfirmText('');
      setHoldStartTime(null);
    }
  }, [visible]);

  const handleConfirm = () => {
    if (confirmText.toLowerCase() === 'confirm') {
      onConfirm();
    }
  };

  const handlePressIn = () => {
    setHoldStartTime(Date.now());
  };

  const handlePressOut = () => {
    if (holdStartTime && Date.now() - holdStartTime >= 3000) {
      onConfirm();
    }
    setHoldStartTime(null);
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Confirm Order</Text>
          <Text>Type 'confirm' to place your order:</Text>
          <TextInput
            ref={inputRef}
            style={styles.input}
            value={confirmText}
            onChangeText={setConfirmText}
            autoCapitalize="none"
          />
          <Button mode="contained" onPress={handleConfirm}>
            Confirm
          </Button>
          <Text style={styles.orText}>OR</Text>
          <Button
            mode="contained"
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            Hold for 3 seconds to confirm
          </Button>
          <Button onPress={onClose} style={styles.cancelButton}>
            Cancel
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  orText: {
    textAlign: 'center',
    marginVertical: 10,
  },
  cancelButton: {
    marginTop: 10,
  },
});

export default ConfirmationModal;
